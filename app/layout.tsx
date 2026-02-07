import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LocationProvider } from "@/contexts/LocationContext"
import { UserProvider } from "@/contexts/UserContext"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CarAtlas - Buy and Compare Cars",
  description: "Search and compare cars. Find the best deals on thousands of quality used cars.",
  generator: "CarAtlas",
  icons: {
    icon: "/logos/caratlas-icon.png",
    shortcut: "/logos/caratlas-icon.png",
    apple: "/logos/caratlas-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LocationProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </LocationProvider>
        <Analytics />
      </body>
    </html>
  )
}
