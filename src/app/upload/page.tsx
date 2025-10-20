import React from 'react'
import UploadForm from '../../components/UploadForm'

export default function UploadPage() {
  return (
    <div>
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upload Document</h2>
      </header>

      <div className="mt-6">
        <UploadForm />
      </div>
    </div>
  )
}
