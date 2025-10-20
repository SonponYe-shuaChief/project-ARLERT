import formidable from 'formidable'
import fs from 'fs'
import { supabase } from '../../../src/lib/supabaseClient'
import { extractTextFromPdf } from '../../../src/lib/serverUtils'

export const config = {
  api: {
    bodyParser: false
  }
}

const uploadHandler = async (req: any, res: any) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const form = new formidable.IncomingForm()
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: String(err) })
    // @ts-ignore
    const file = files.file
    if (!file) return res.status(400).json({ error: 'No file uploaded' })

    try {
      const buffer = fs.readFileSync(file.filepath || file.path)

      const text = await extractTextFromPdf(buffer)

      // Store the file in Supabase storage (server-side requires service role key in headers)
      const bucket = process.env.SUPABASE_BUCKET || 'documents'
      const filename = `${Date.now()}_${file.originalFilename || file.name}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from(bucket).upload(filename, buffer, { upsert: false })
      if (uploadError) console.warn('Storage upload error', uploadError.message)

      // Create a document record in Supabase table 'documents' (requires service role key from server env)
      const { data, error } = await supabase.from('documents').insert([{ title: file.originalFilename || 'document', storage_path: filename, text_preview: text.slice(0, 1000) }]).select().single()
      if (error) console.warn('Insert error', error.message)

      res.status(200).json({ id: data?.id ?? null, message: 'ok' })
    } catch (e: any) {
      res.status(500).json({ error: e.message })
    }
  })
}

export default uploadHandler
