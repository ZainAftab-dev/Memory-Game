import type { Metadata } from 'next'
import '@fontsource-variable/fredoka'
import '@fontsource-variable/nunito'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Memory Game',
  description: 'A card-matching memory game with 4x4 and 6x6 boards, a timer, combos and best scores.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = { themeColor: '#a6e3cf' }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-table font-sans text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
