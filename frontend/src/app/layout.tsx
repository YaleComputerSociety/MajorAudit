
import "./globals.css";
import { AuthProvider } from "./providers";

export const metadata = {
  title: "MajorAudit"
}

export default function RootLayout({children}: {children: React.ReactNode})
{
  return(
    <html lang="en">
      <body>
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
    </html>
  )
}
