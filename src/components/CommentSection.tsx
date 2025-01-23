"use client"

import { useState } from "react"
import { useAuth } from "./AuthProvider"

interface Comment {
  id: string
  user: {
    id: string
    username: string
  }
  text: string
  createdAt: string
}

interface CommentSectionProps {
  projectId: string
  comments: Comment[]
}

export default function CommentSection({ projectId, comments: initialComments }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("You must be logged in to comment")
      return
    }

    if (newComment.trim()) {
      // In a real application, you'd make an API call to save the comment
      try {
        // Simulating an API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const newCommentObj: Comment = {
          id: Date.now().toString(),
          user: {
            id: user.id,
            username: user.username,
          },
          text: newComment,
          createdAt: new Date().toISOString(),
        }
        setComments([...comments, newCommentObj])
        setNewComment("")
      } catch (error) {
        console.error("Error posting comment:", error)
      }
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {user ? (
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-3 py-2 border rounded"
            rows={3}
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-4 text-gray-600">Please log in to comment.</p>
      )}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <p className="font-semibold">{comment.user.username}</p>
            <p>{comment.text}</p>
            <p className="text-sm text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

