import { openai, generateSummary, generateFlashcards } from '../../../src/lib/serverUtils'
import { supabase } from '../../../src/lib/supabaseClient'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { documentId, text } = req.body || {}
  let sourceText = text

  try {
    if (!sourceText && documentId) {
      const { data } = await supabase.from('documents').select('text_preview').eq('id', documentId).single()
      sourceText = data?.text_preview || ''
    }

    if (!sourceText) return res.status(400).json({ error: 'No text to summarize' })

    const summary = await generateSummary(sourceText)
    const flashcards = await generateFlashcards(sourceText)

    // persist
    await supabase.from('summaries').insert([{ document_id: documentId || null, summary }])
    await supabase.from('flashcards').insert([{ document_id: documentId || null, content: flashcards }])

    res.status(200).json({ summary, flashcards })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}
