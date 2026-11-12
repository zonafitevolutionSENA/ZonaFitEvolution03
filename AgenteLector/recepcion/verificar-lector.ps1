# Dice si el lector esta conectado al servidor y muestra los ultimos mensajes del agente
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$agente = Split-Path -Parent $PSScriptRoot
$cfg = @{}
Get-Content (Join-Path $agente '.env') | ForEach-Object { if ($_ -match '^\s*([A-Z_]+)\s*=\s*(.*)$') { $cfg[$Matches[1]] = $Matches[2].Trim() } }
$salud = $cfg['API_WS_URL'] -replace '^wss://', 'https://' -replace '^ws://', 'http://' -replace '/agente/?$', '/api/salud'
try {
  $r = Invoke-RestMethod -Uri $salud -TimeoutSec 15
  if ($r.lector -eq 'conectado') { Write-Host "`n   LECTOR CONECTADO: todo funciona`n" -ForegroundColor Green }
  else {
    Write-Host "`n   LECTOR DESCONECTADO`n" -ForegroundColor Red
    Write-Host '   1. Revisa que el cable USB del lector este bien conectado.'
    Write-Host '   2. Reinicia el portatil.'
  }
} catch {
  Write-Host "`n   SIN CONEXION CON EL SERVIDOR`n" -ForegroundColor Red
  Write-Host '   Revisa que el portatil tenga internet (wifi o datos del celular).'
}
$log = Join-Path $agente 'agente.log'
if (Test-Path $log) { Write-Host "`nUltimos mensajes del agente:"; Get-Content $log -Tail 10 }
