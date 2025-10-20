import React, { useState } from 'react'

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return setStatus('Please pick a file')

    const data = new FormData()
    data.append('file', file)

    setStatus('Uploading...')

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Upload failed')
      setStatus('Uploaded — document id: ' + json.id)
    } catch (err: any) {
      setStatus('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow max-w-xl">
      <label className="block">
        <span className="text-sm font-medium">Select PDF</span>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-2" />
      </label>

      <div className="mt-4">
        <button className="px-4 py-2 bg-arlert-500 text-white rounded" type="submit">Upload</button>
      </div>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </form>
  )
}
