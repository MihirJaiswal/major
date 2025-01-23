"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Eye, Share2 } from "lucide-react"
import { useAuth } from "../../../components/AuthProvider"
import CommentSection from "../../../components/CommentSection"
import LikeButton from "../../../components/LikeButton"
import CollaborationPanel from "../../../components/CollaborationPanel"
import EmailChatButton from "../../../components/EmailChatButton"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [project, setProject] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulating an API call to fetch project data
    const fetchProject = async () => {
      setIsLoading(true)
      // In a real application, you'd fetch the project data from your API
      const projectData = {
        id: params.id,
        title: "Amazing Project",
        author: "John Doe",
        authorId: "123",
        description: "This is an amazing project that showcases various design skills and techniques.",
        image: "/placeholder.svg?height=600&width=800",
        likes: 1234,
        views: 5678,
        comments: [],
        collaborators: [
          { id: "1", username: "johndoe", role: "owner" },
          { id: "2", username: "janedoe", role: "editor" },
        ],
      }
      setProject(projectData)
      setIsLoading(false)
    }

    fetchProject()
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      <p className="text-xl text-gray-600 mb-8">by {project.author}</p>
      <div className="relative aspect-video mb-8">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover rounded-lg" />
      </div>
      <div className="flex items-center space-x-8 mb-8">
        <LikeButton projectId={project.id} initialLikes={project.likes} />
        <div className="flex items-center space-x-2 text-gray-500">
          <Eye />
          <span>{project.views} views</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <MessageCircle />
          <span>{project.comments.length} comments</span>
        </div>
        <button className="flex items-center space-x-2 text-gray-500">
          <Share2 />
          <span>Share</span>
        </button>
        <EmailChatButton projectId={project.id} projectTitle={project.title} />
      </div>
      <p className="text-lg mb-8">{project.description}</p>
      <CollaborationPanel projectId={project.id} initialCollaborators={project.collaborators} />
      <CommentSection projectId={project.id} comments={project.comments} />
    </div>
  )
}

