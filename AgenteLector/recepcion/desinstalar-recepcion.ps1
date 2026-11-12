# Quita la tarea programada, detiene el agente y borra los accesos directos
$tarea = 'ZonaFit - Agente del lector'
Stop-ScheduledTask -TaskName $tarea -ErrorAction SilentlyContinue
Unregister-ScheduledTask -TaskName $tarea -Confirm:$false -ErrorAction SilentlyContinue
Get-CimInstance Win32_Process |
  Where-Object { $_.CommandLine -like '*iniciar-agente.bat*' -or ($_.Name -eq 'node.exe' -and $_.CommandLine -like '*AgenteLector\index.js*') } |
  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
Remove-Item (Join-Path ([Environment]::GetFolderPath('Startup')) 'Pantalla de ingreso ZonaFit.lnk') -ErrorAction SilentlyContinue
foreach ($nombre in 'Verificar lector ZonaFit.lnk', 'Pantalla de ingreso ZonaFit.lnk', 'Administracion ZonaFit.lnk') {
  Remove-Item (Join-Path ([Environment]::GetFolderPath('Desktop')) $nombre) -ErrorAction SilentlyContinue
}
Write-Host "`nListo: el huellero ya no arranca solo en este portatil." -ForegroundColor Green
