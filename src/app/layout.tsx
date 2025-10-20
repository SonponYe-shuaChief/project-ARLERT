import './globals.css'
import React from 'react'

export const metadata = {
  title: 'ARLERT',
  description: 'AI Study Assistant'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
      </body>
    </html>
  )
}
