import React, { useState } from 'react'

export default function ChatBox({ initial }: { initial?: string }) {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<string[]>(initial ? [initial] : [])

  async function send() {
    if (!text) return
    setMessages((m) => [...m, 'You: ' + text])
    setText('')
    // TODO: call server API for OpenAI chat
    setMessages((m) => [...m, 'ARLERT: (sample reply)'])
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="h-48 overflow-auto mb-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="text-sm text-gray-700">{m}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 px-3 py-2 border rounded" />
        <button onClick={send} className="px-3 py-2 bg-arlert-500 text-white rounded">Send</button>
      </div>
    </div>
  )
}
