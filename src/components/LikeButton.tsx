"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useAuth } from "./AuthProvider"

interface LikeButtonProps {
  projectId: string
  initialLikes: number
}

export default function LikeButton({ projectId, initialLikes }: LikeButtonProps) {
  const { user } = useAuth()
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a project")
      return
    }

    // In a real application, you'd make an API call to update the like status
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (isLiked) {
        setLikes(likes - 1)
      } else {
        setLikes(likes + 1)
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Error updating like status:", error)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 ${isLiked ? "text-red-500" : "text-gray-500"}`}
      aria-label={isLiked ? "Unlike project" : "Like project"}
    >
      <Heart className={isLiked ? "fill-current" : ""} />
      <span>{likes} likes</span>
    </button>
  )
}

