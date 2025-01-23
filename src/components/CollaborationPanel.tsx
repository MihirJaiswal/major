"use client"

import { useState } from "react"
import { useAuth } from "./AuthProvider"

interface Collaborator {
  id: string
  username: string
  role: string
}

interface CollaborationPanelProps {
  projectId: string
  initialCollaborators: Collaborator[]
}

export default function CollaborationPanel({ projectId, initialCollaborators }: CollaborationPanelProps) {
  const { user } = useAuth()
  const [collaborators, setCollaborators] = useState<Collaborator[]>(initialCollaborators)
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("")
  const [newCollaboratorRole, setNewCollaboratorRole] = useState("editor")

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("You must be logged in to add collaborators")
      return
    }

    try {
      // In a real application, you'd make an API call to add the collaborator
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newCollaborator: Collaborator = {
        id: Date.now().toString(),
        username: newCollaboratorEmail.split("@")[0], // This is just for demonstration
        role: newCollaboratorRole,
      }
      setCollaborators([...collaborators, newCollaborator])
      setNewCollaboratorEmail("")
      setNewCollaboratorRole("editor")
    } catch (error) {
      console.error("Error adding collaborator:", error)
    }
  }

  return (
    <div className="mt-8 border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Collaborators</h2>
      <ul className="mb-4">
        {collaborators.map((collaborator) => (
          <li key={collaborator.id} className="flex justify-between items-center mb-2">
            <span>{collaborator.username}</span>
            <span className="text-gray-500">{collaborator.role}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddCollaborator} className="space-y-2">
        <input
          type="email"
          value={newCollaboratorEmail}
          onChange={(e) => setNewCollaboratorEmail(e.target.value)}
          placeholder="Collaborator's email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <select
          value={newCollaboratorRole}
          onChange={(e) => setNewCollaboratorRole(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Collaborator
        </button>
      </form>
    </div>
  )
}

