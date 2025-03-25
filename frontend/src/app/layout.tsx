
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ProgramProvider } from "@/context/ProgramProvider";

export const metadata = {
  title: "MajorAudit"
}

export default function RootLayout({children}: {children: React.ReactNode})
{
  return(
    <html lang="en">
      <body>
				<ProgramProvider>
					<AuthProvider>
							{children}
					</AuthProvider>
				</ProgramProvider>
			</body>
    </html>
  )
}
