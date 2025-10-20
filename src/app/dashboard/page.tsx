import React from 'react'
import Link from 'next/link'
import DocumentCard from '../../components/DocumentCard'

const demoDocs = [
  { id: '1', title: 'Sample Lecture Notes', excerpt: 'An overview of modern algebra...' },
  { id: '2', title: 'Biology Chapter 3', excerpt: 'Cell structure and function...' }
]

export default function DashboardPage() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <Link href="/upload" className="px-3 py-1 bg-arlert-500 text-white rounded">Upload</Link>
      </header>

      <section className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {demoDocs.map((d) => (
          <DocumentCard key={d.id} id={d.id} title={d.title} excerpt={d.excerpt} />
        ))}
      </section>
    </div>
  )
}
