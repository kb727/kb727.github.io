# Auto update dates in robots.txt and sitemap.xml

# Get current date in YYYY-MM-DD format
$currentDate = Get-Date -Format 'yyyy-MM-dd'

Write-Host "Current date: $currentDate"
Write-Host ""

# Update date in robots.txt
Write-Host "Updating robots.txt..."
try {
    $robotsContent = Get-Content -Path .\robots.txt -Encoding UTF8
    $newRobotsContent = $robotsContent -replace '# Updated on \d{4}-\d{2}-\d{2}', "# Updated on $currentDate"
    Set-Content -Path .\robots.txt -Value $newRobotsContent -Encoding UTF8
    Write-Host "Successfully updated robots.txt"
} catch {
    Write-Host "Error updating robots.txt: $_"
}

Write-Host ""

# Update dates in sitemap.xml
Write-Host "Updating sitemap.xml..."
try {
    $sitemapContent = Get-Content -Path .\sitemap.xml -Encoding UTF8
    $newSitemapContent = $sitemapContent -replace '<lastmod>\d{4}-\d{2}-\d{2}</lastmod>', "<lastmod>$currentDate</lastmod>"
    Set-Content -Path .\sitemap.xml -Value $newSitemapContent -Encoding UTF8
    Write-Host "Successfully updated sitemap.xml"
} catch {
    Write-Host "Error updating sitemap.xml: $_"
}

Write-Host ""
Write-Host "Update completed!"