import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ReactQueryProvider } from "@/providers/react-query-provider"
import { Suspense } from "react"
import { AlertProvider } from "@workspace/ui/hooks"
import { SessionProvider } from "@/providers/session-provider"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Suspense>
          <AlertProvider>
            <ReactQueryProvider>
              <SessionProvider>
                {children}
              </SessionProvider>
            </ReactQueryProvider>
          </AlertProvider>
        </Suspense>
      </body>
    </html>
  )
}
