# an elegant and graceful way to start all the development servers with a single command

$dbPath = "C:\Users\Bence\Desktop\htmx-localdev\db"
$serverPath = "C:\Users\Bence\Desktop\htmx-localdev\server"
$httpServer = "C:\Users\Bence\Desktop\htmx-localdev"

# Start development servers

Start-Process powershell.exe -NoNewWindow -ArgumentList "-Command cd '$dbPath'; npm run dev"
Start-Process powershell.exe -NoNewWindow -ArgumentList "-Command cd '$serverPath'; npm run dev"
Start-Process powershell.exe -NoNewWindow -ArgumentList "-Command cd '$httpServer'; http-server -p 3000"
