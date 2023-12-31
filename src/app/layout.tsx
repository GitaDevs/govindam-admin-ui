import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Govindam App',
  description: 'Best Prasadam!!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Govindam App</title>
      </head>
      <body style={{margin:'0px'}}>
        {children}
      </body>
    </html>
  )
}
