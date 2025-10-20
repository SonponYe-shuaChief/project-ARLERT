import fs from 'fs'
import pdf from 'pdf-parse'
import OpenAI from 'openai'

export async function extractTextFromPdf(buffer: Buffer) {
  const data = await pdf(buffer)
  return data.text
}

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function generateSummary(text: string) {
  // Minimal example using chat completions
  const prompt = `Summarize the following text into a concise study summary. Keep bullets and key concepts.\n\n${text}`
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500
  })
  return res.choices?.[0]?.message?.content ?? ''
}

export async function generateFlashcards(text: string) {
  const prompt = `Create 8 short flashcards (Q/A) from the text below to help memorize the main points:\n\n${text}`
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500
  })
  return res.choices?.[0]?.message?.content ?? ''
}
