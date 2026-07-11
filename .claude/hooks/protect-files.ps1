<#
PreToolUse hook - blocks Write/Edit calls targeting protected files.

Exit codes:
  0 -> allowed
  2 -> blocked (stderr message fed back to Claude)
#>

$ProtectedPatterns = @('.env', 'package-lock.json', '.git/')

try {
    $raw = [Console]::In.ReadToEnd()
    $data = $raw | ConvertFrom-Json
} catch {
    exit 0
}

$filePath = $data.tool_input.file_path
if (-not $filePath) {
    exit 0
}

$normalized = $filePath -replace '\\', '/'

foreach ($pattern in $ProtectedPatterns) {
    if ($normalized -like "*$pattern*") {
        [Console]::Error.WriteLine("Blocked: '$filePath' matches protected pattern '$pattern'")
        exit 2
    }
}

exit 0
