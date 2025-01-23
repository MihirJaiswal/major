"use client"

import { useState } from "react"
import { Mail } from "lucide-react"

interface EmailChatButtonProps {
  projectId: string
  projectTitle: string
}

export default function EmailChatButton({ projectId, projectTitle }: EmailChatButtonProps) {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState("")

  const handleEmailChat = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you'd make an API call to send the chat transcript
    console.log(`Emailing chat for project ${projectId} to ${email}`)
    setEmail("")
    setShowEmailForm(false)
    alert("Chat transcript has been emailed!")
  }

  return (
    <>
      <button
        onClick={() => setShowEmailForm(true)}
        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
      >
        <Mail size={20} />
        <span>Email Chat</span>
      </button>
      {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Email Chat Transcript</h2>
            <p className="mb-4">Send the chat transcript for "{projectTitle}" to your email.</p>
            <form onSubmit={handleEmailChat}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-4"
                placeholder="Enter your email address"
                required
              />
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowEmailForm(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Send Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

