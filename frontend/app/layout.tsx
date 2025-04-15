
import "./globals.css";
import { AuthProvider } from "../context/AuthProvider";
import { UserProvider } from "@/context/UserProvider";
import { ProgramProvider } from "../context/ProgramProvider";

export const metadata = {
  title: "MajorAudit",
	icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({children}: {children: React.ReactNode})
{
  return(
    <html lang="en">
      <body>
				<AuthProvider>
					<UserProvider>
						<ProgramProvider>
							{children}
						</ProgramProvider>
					</UserProvider>
				</AuthProvider>
			</body>
    </html>
  )
}
