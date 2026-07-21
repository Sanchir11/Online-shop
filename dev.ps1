$nodeBin = "C:\Users\munkhsoyol.n\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
$pnpm = "C:\Users\munkhsoyol.n\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"
$env:Path = "$nodeBin;$env:Path"
Set-Location $PSScriptRoot
& $pnpm dev --hostname 127.0.0.1 --port 3000
