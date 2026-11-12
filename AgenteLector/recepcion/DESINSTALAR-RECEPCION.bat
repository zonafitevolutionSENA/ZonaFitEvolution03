@echo off
rem Doble clic: quita el arranque automatico. Pide permisos de administrador.
net session >nul 2>&1
if %errorlevel% neq 0 (
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0desinstalar-recepcion.ps1"
pause
