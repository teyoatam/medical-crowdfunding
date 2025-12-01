# PowerShell script to convert Next.js pages to React Router pages

$files = @(
    @{From="app\campaigns\page.tsx"; To="src\pages\CampaignsPage.tsx"},
    @{From="app\campaign\[id]\page.tsx"; To="src\pages\CampaignDetailPage.tsx"},
    @{From="app\start-campaign\page.tsx"; To="src\pages\StartCampaignPage.tsx"},
    @{From="app\login\page.tsx"; To="src\pages\LoginPage.tsx"},
    @{From="app\register\page.tsx"; To="src\pages\RegisterPage.tsx"},
    @{From="app\forgot-password\page.tsx"; To="src\pages\ForgotPasswordPage.tsx"},
    @{From="app\donor\dashboard\page.tsx"; To="src\pages\DonorDashboardPage.tsx"},
    @{From="app\donor\profile\page.tsx"; To="src\pages\DonorProfilePage.tsx"},
    @{From="app\admin\dashboard\page.tsx"; To="src\pages\AdminDashboardPage.tsx"},
    @{From="app\admin\campaigns\[id]\page.tsx"; To="src\pages\AdminCampaignDetailPage.tsx"}
)

foreach ($file in $files) {
    $content = Get-Content $file.From -Encoding UTF8
    
    # Remove "use client"
    $content = $content -replace '"use client"', ''
    
    # Replace Next.js Link with React Router Link
    $content = $content -replace 'import Link from "next/link"', 'import { Link } from "react-router-dom"'
    
    # Replace href= with to=
    $content = $content -replace '<Link href=', '<Link to='
    
    # Remove framer-motion
    $content = $content -replace 'import \{ motion \} from "framer-motion"', '// Removed framer-motion'
    $content = $content -replace '<motion\.div', '<div'
    $content = $content -replace '</motion\.div>', '</div>'
    
    # Handle useParams for dynamic routes
    if ($file.From -match '\[id\]') {
        $content = $content -replace 'import Link from "next/link"', 'import { Link, useParams } from "react-router-dom"'
        $content = $content -replace 'import \{ Link \} from "react-router-dom"', 'import { Link, useParams } from "react-router-dom"'
        $content = $content -replace 'export default function \w+Page\(\{ params \}: \{ params: \{ id: string \} \}\)', 'export default function $&() {'
        $content = $content -replace 'export default function (\w+Page)\(\{ params \}: \{ params: \{ id: string \} \}\)', 'export default function $1()'
        # Add useParams at the start of the component
        $content = $content -replace '(export default function \w+Page\(\) \{)', '$1`n  const { id } = useParams()'
    }
    
    $content | Set-Content $file.To -Encoding UTF8
    Write-Host "Converted $($file.From) -> $($file.To)"
}

Write-Host "`nAll pages converted successfully!"
