# Test script untuk API verification
$headers = @{
    'Content-Type' = 'application/json'
}

$body = @{
    text = "This is a simple test news for verification. Scientists have discovered that drinking water is beneficial for human health."
} | ConvertTo-Json

Write-Host "Testing API endpoint: http://localhost:3001/api/verify"
Write-Host "Request body: $body"

try {
    $response = Invoke-RestMethod -Uri 'http://localhost:3001/api/verify' -Method POST -Headers $headers -Body $body
    Write-Host "Success! Response:"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error occurred:"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
    Write-Host "Error Message: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
}