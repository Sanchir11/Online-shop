@echo off
set "NODE_BIN=C:\Users\munkhsoyol.n\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "PNPM=C:\Users\munkhsoyol.n\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"
set "PATH=%NODE_BIN%;%PATH%"
cd /d "%~dp0"
"%PNPM%" dev --hostname 127.0.0.1 --port 3000
