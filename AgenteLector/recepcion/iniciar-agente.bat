@echo off
rem Arranca el agente del lector y lo vuelve a abrir si se cierra. Lo ejecuta la tarea programada.
cd /d "%~dp0.."
:bucle
if exist agente.log for %%A in (agente.log) do if %%~zA GTR 5000000 move /y agente.log agente.anterior.log >nul
echo [%date% %time%] Iniciando agente>> agente.log
node "%CD%\index.js" >> agente.log 2>&1
rem Espera 5 segundos antes de reintentar (ping funciona aunque no haya ventana)
ping -n 6 127.0.0.1 >nul
goto bucle
