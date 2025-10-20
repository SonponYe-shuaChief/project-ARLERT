import React from 'react'
import Link from 'next/link'

export default function DocumentCard({ id, title, excerpt }: { id: string; title: string; excerpt?: string }) {
  return (
    <article className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{excerpt}</p>
      <div className="mt-3">
        <Link href={`/documents/${id}`} className="text-arlert-600">Open</Link>
      </div>
    </article>
  )
}
