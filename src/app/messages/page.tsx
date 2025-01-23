"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../components/AuthProvider"
import Link from "next/link"

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  participantId: string
  participantName: string
  lastMessage: string
  timestamp: string
}

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    // Fetch conversations (in a real app, this would be an API call)
    const fetchedConversations: Conversation[] = [
      {
        id: "1",
        participantId: "2",
        participantName: "Jane Doe",
        lastMessage: "Hello!",
        timestamp: "2023-05-20T10:30:00Z",
      },
      {
        id: "2",
        participantId: "3",
        participantName: "Bob Smith",
        lastMessage: "Great work!",
        timestamp: "2023-05-19T15:45:00Z",
      },
    ]
    setConversations(fetchedConversations)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      // Fetch messages for the selected conversation (in a real app, this would be an API call)
      const fetchedMessages: Message[] = [
        { id: "1", senderId: "2", receiverId: "1", content: "Hello!", timestamp: "2023-05-20T10:30:00Z" },
        { id: "2", senderId: "1", receiverId: "2", content: "Hi there!", timestamp: "2023-05-20T10:31:00Z" },
      ]
      setMessages(fetchedMessages)
    }
  }, [selectedConversation])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && selectedConversation) {
      // In a real app, you'd send this message to the API
      const newMessageObj: Message = {
        id: Date.now().toString(),
        senderId: user!.id,
        receiverId: selectedConversation,
        content: newMessage,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, newMessageObj])
      setNewMessage("")
    }
  }

  if (!user) {
    return <div>Please log in to view your messages.</div>
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-1/3 border-r">
        <h2 className="text-2xl font-bold p-4">Conversations</h2>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedConversation === conversation.id ? "bg-gray-200" : ""}`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <h3 className="font-semibold">{conversation.participantName}</h3>
              <p className="text-sm text-gray-600">{conversation.lastMessage}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.senderId === user.id ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block p-2 rounded-lg ${
                      message.senderId === user.id ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow px-3 py-2 border rounded-l"
                  placeholder="Type a message..."
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  )
}

