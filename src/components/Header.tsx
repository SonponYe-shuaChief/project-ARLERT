import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="text-xl font-bold text-arlert-600">ARLERT</Link>
      <nav className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upload">Upload</Link>
      </nav>
    </header>
  )
}
