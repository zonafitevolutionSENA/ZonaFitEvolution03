# Configura el portatil de recepcion: agente del lector y pantalla de ingreso al iniciar sesion
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$agente  = Split-Path -Parent $PSScriptRoot
$backend = Join-Path (Split-Path -Parent $agente) 'BackendZonafitevolution'
$tarea   = 'ZonaFit - Agente del lector'
$usuario = "$env:USERDOMAIN\$env:USERNAME"

function Paso($texto)  { Write-Host "`n== $texto" -ForegroundColor Yellow }
function Falla($texto) { Write-Host "`nERROR: $texto" -ForegroundColor Red; exit 1 }

Paso '1/6 Revisando Node.js'
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Falla 'Node.js no esta instalado. Instala la version LTS desde nodejs.org y vuelve a ejecutar.' }
Write-Host "Node.js $(node -v)"

Paso '2/6 Revisando AgenteLector\.env'
$archivoEnv = Join-Path $agente '.env'
if (-not (Test-Path $archivoEnv)) { Falla "Falta $archivoEnv. Copia ahi el .env del agente." }
$cfg = @{}
Get-Content $archivoEnv | ForEach-Object { if ($_ -match '^\s*([A-Z_]+)\s*=\s*(.*)$') { $cfg[$Matches[1]] = $Matches[2].Trim() } }
foreach ($v in 'API_WS_URL', 'AGENTE_TOKEN', 'BIOMETRIA_SALT') { if (-not $cfg[$v]) { Falla "Falta $v en el .env" } }

Paso '3/6 Instalando dependencias (solo la primera vez)'
foreach ($carpeta in $backend, $agente) {
  if (-not (Test-Path (Join-Path $carpeta 'node_modules'))) {
    Push-Location $carpeta; npm install --omit=dev; $codigo = $LASTEXITCODE; Pop-Location
    if ($codigo -ne 0) { Falla "npm install fallo en $carpeta" }
  }
}

Paso '4/6 Programando el agente al iniciar sesion'
$bat = Join-Path $PSScriptRoot 'iniciar-agente.bat'
$accion     = New-ScheduledTaskAction -Execute 'conhost.exe' -Argument "--headless `"$bat`""
$disparador = New-ScheduledTaskTrigger -AtLogOn -User $usuario
$disparador.Delay = 'PT30S'
$ajustes    = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit ([TimeSpan]::Zero) -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -MultipleInstances IgnoreNew
$principal  = New-ScheduledTaskPrincipal -UserId $usuario -LogonType Interactive -RunLevel Limited
Register-ScheduledTask -TaskName $tarea -Action $accion -Trigger $disparador -Settings $ajustes -Principal $principal -Force | Out-Null
Write-Host "Tarea '$tarea' creada para $usuario"

Paso '5/6 Pantalla de ingreso y accesos directos'
$frontend = if ($cfg['FRONTEND_URL']) { $cfg['FRONTEND_URL'].TrimEnd('/') } else { 'https://zona-fit-evolution03.vercel.app' }
$url = "$frontend/?pantalla=acceso"
if ($cfg['PANTALLA_TOKEN']) { $url += "&token=$($cfg['PANTALLA_TOKEN'])" }
$chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
            "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
            "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
$programa = if ($chrome) { $chrome } else { "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe" }
# Ventana normal maximizada (sin barra de direcciones): se puede minimizar y seguir usando el PC
$argumentosPantalla = "--app=`"$url`" --start-maximized"
$escritorio = [Environment]::GetFolderPath('Desktop')
$shell = New-Object -ComObject WScript.Shell
function AccesoDirecto($ruta, $destino, $argumentos) {
  $acceso = $shell.CreateShortcut($ruta)
  $acceso.TargetPath = $destino; $acceso.Arguments = $argumentos; $acceso.Save()
}
AccesoDirecto (Join-Path ([Environment]::GetFolderPath('Startup')) 'Pantalla de ingreso ZonaFit.lnk') $programa $argumentosPantalla
AccesoDirecto (Join-Path $escritorio 'Pantalla de ingreso ZonaFit.lnk') $programa $argumentosPantalla
AccesoDirecto (Join-Path $escritorio 'Administracion ZonaFit.lnk') $programa "--new-window `"$frontend`""
AccesoDirecto (Join-Path $escritorio 'Verificar lector ZonaFit.lnk') (Join-Path $PSScriptRoot 'VERIFICAR-LECTOR.bat') ''
Write-Host "Pantalla de ingreso: $frontend/?pantalla=acceso"
Write-Host "Accesos en el escritorio: Pantalla de ingreso, Administracion y Verificar lector"

Paso '6/6 Energia y prueba'
powercfg /change standby-timeout-ac 0
powercfg /change monitor-timeout-ac 0
# Suspension selectiva de USB desactivada: el lector no se apaga solo
powercfg /setacvalueindex SCHEME_CURRENT 2a737441-1930-4402-8d77-b2bebba308a3 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0
powercfg /setactive SCHEME_CURRENT
Start-ScheduledTask -TaskName $tarea
Start-Sleep -Seconds 20
$salud = $cfg['API_WS_URL'] -replace '^wss://', 'https://' -replace '^ws://', 'http://' -replace '/agente/?$', '/api/salud'
try {
  $r = Invoke-RestMethod -Uri $salud -TimeoutSec 20
  if ($r.lector -eq 'conectado') { Write-Host "`nLISTO: el lector esta conectado. Reinicia el portatil para probar el arranque automatico." -ForegroundColor Green }
  else { Write-Host "`nEl servidor responde, pero el lector no se conecto. Revisa AgenteLector\agente.log" -ForegroundColor Red }
} catch { Write-Host "`nNo hay conexion con el servidor ($salud). Revisa internet." -ForegroundColor Red }
