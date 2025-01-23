"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "../../../components/AuthProvider"
import { Mail, MessageCircle, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function UserProfile({ params }: { params: Promise<{ username: string }> }) {
  const username = React.use(params).username
  const { user: currentUser } = useAuth()
  const [isFollowing, setIsFollowing] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactMessage, setContactMessage] = useState("")
  const [showHireForm, setShowHireForm] = useState(false)
  const [hireMessage, setHireMessage] = useState("")

  // In a real application, you'd fetch the user data and their projects based on the username
  const user = {
    username,
    name: "John Doe",
    bio: "Passionate designer and illustrator",
    avatar: "/placeholder.svg?height=200&width=200",
    projects: [
      { id: 1, title: "Project 1", image: "/placeholder.svg?height=300&width=400" },
      { id: 2, title: "Project 2", image: "/placeholder.svg?height=300&width=400" },
      { id: 3, title: "Project 3", image: "/placeholder.svg?height=300&width=400" },
    ],
    followers: 1234,
    following: 567,
    skills: ["UI Design", "Illustration", "Branding"],
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // In a real application, you'd make an API call to follow/unfollow the user
  }

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you'd send this message to the API
    console.log(`Sending message to ${user.username}: ${contactMessage}`)
    setContactMessage("")
    setShowContactForm(false)
    alert("Your message has been sent!")
  }

  const handleHire = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you'd send this hiring request to the API
    console.log(`Sending hiring request to ${user.username}: ${hireMessage}`)
    setHireMessage("")
    setShowHireForm(false)
    alert("Your hiring request has been sent!")
  }

  const handleDirectChat = () => {
    // In a real application, you'd redirect to a chat page or open a chat modal
    console.log(`Opening direct chat with ${user.username}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8 mb-12">
        <Avatar className="w-48 h-48">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            {currentUser && currentUser.username !== user.username && (
              <div className="space-x-2">
                <Button variant={isFollowing ? "outline" : "default"} onClick={handleFollow}>
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contact {user.name}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleContact}>
                      <Textarea
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Enter your message..."
                        required
                      />
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Send Message</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleDirectChat}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Direct Chat
                </Button>
                <Dialog open={showHireForm} onOpenChange={setShowHireForm}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Hire
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Hire {user.name}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleHire}>
                      <Textarea
                        value={hireMessage}
                        onChange={(e) => setHireMessage(e.target.value)}
                        placeholder="Describe the job opportunity..."
                        required
                      />
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button type="button" variant="outline" onClick={() => setShowHireForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Send Hiring Request</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">@{user.username}</p>
          <p className="text-lg mb-4">{user.bio}</p>
          <div className="flex space-x-4 text-gray-600 dark:text-gray-300 mb-4">
            <span>{user.followers} Followers</span>
            <span>{user.following} Following</span>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {user.projects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id} className="group">
            <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

