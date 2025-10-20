import React from 'react'
import { notFound } from 'next/navigation'

interface Props { params: { id: string } }

export default function DocumentPage({ params }: Props) {
  const { id } = params
  if (!id) notFound()

  return (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Document {id}</h2>
      </header>

      <section className="mt-6 space-y-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Summary</h3>
          <p className="text-sm text-gray-700 mt-2">(Summary will appear here)</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Flashcards</h3>
          <p className="text-sm text-gray-700 mt-2">(Flashcards / Quiz questions here)</p>
        </div>
      </section>
    </div>
  )
}
