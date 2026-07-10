$routes = @(
    "src/app/advisor/jobs/page.tsx",
    "src/app/advisor/check-in/page.tsx",
    "src/app/advisor/estimates/page.tsx",
    "src/app/advisor/deliveries/page.tsx",
    "src/app/advisor/layout.tsx",
    "src/app/technician/jobs/page.tsx",
    "src/app/technician/jobs/[id]/page.tsx",
    "src/app/technician/layout.tsx",
    "src/app/cashier/queue/page.tsx",
    "src/app/cashier/settle/[jobId]/page.tsx",
    "src/app/cashier/receipt/[jobId]/page.tsx",
    "src/app/cashier/history/page.tsx",
    "src/app/cashier/layout.tsx",
    "src/app/admin/page.tsx",
    "src/app/admin/staff/page.tsx",
    "src/app/admin/customers/page.tsx",
    "src/app/admin/services/page.tsx",
    "src/app/admin/settings/page.tsx",
    "src/app/admin/reports/page.tsx",
    "src/app/track/[hash]/page.tsx"
)

foreach ($route in $routes) {
    $dir = Split-Path $route -Parent
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    
    $name = (Split-Path $dir -Leaf).ToUpper()
    if ($route -match "layout.tsx") {
        $content = "export default function Layout({ children }: { children: React.ReactNode }) { return <div className='p-6'>{children}</div> }"
    } else {
        $content = "export default function Page() { return <div>$name Page</div> }"
    }

    if (!(Test-Path $route)) {
        Set-Content -Path $route -Value $content
    }
}
