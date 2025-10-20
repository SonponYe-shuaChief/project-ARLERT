import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-arlert-600">ARLERT</h1>
      <p className="mt-4 text-gray-600">AI-powered study assistant — sign in to get started.</p>

      <div className="mt-8 space-x-4">
        <Link href="/dashboard" className="px-4 py-2 bg-arlert-500 text-white rounded">Demo Dashboard</Link>
        <Link href="/upload" className="px-4 py-2 border border-arlert-500 text-arlert-600 rounded">Upload a Document</Link>
      </div>
    </main>
  )
}
