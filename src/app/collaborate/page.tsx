"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../../components/AuthProvider"
import { Search, Filter, MessageCircle } from "lucide-react"

interface CollaborationOpportunity {
  id: string
  title: string
  description: string
  skills: string[]
  postedBy: string
  postedDate: string
}

const initialOpportunities: CollaborationOpportunity[] = [
  {
    id: "1",
    title: "Seeking UI Designer for Mobile App",
    description: "Looking for a talented UI designer to collaborate on a new mobile app project...",
    skills: ["UI Design", "Mobile App", "Figma"],
    postedBy: "johndoe",
    postedDate: "2023-05-20",
  },
  {
    id: "2",
    title: "Illustrator Needed for Children's Book",
    description: "Seeking an illustrator to bring a children's story to life...",
    skills: ["Illustration", "Children's Book", "Digital Art"],
    postedBy: "janedoe",
    postedDate: "2023-05-19",
  },
]

export default function CollaboratePage() {
  const { user } = useAuth()
  const [opportunities, setOpportunities] = useState<CollaborationOpportunity[]>(initialOpportunities)
  const [searchTerm, setSearchTerm] = useState("")
  const [showPostForm, setShowPostForm] = useState(false)
  const [newOpportunity, setNewOpportunity] = useState<
    Omit<CollaborationOpportunity, "id" | "postedBy" | "postedDate">
  >({
    title: "",
    description: "",
    skills: [],
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd make an API call to search opportunities
    const filteredOpportunities = initialOpportunities.filter(
      (opportunity) =>
        opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opportunity.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setOpportunities(filteredOpportunities)
  }

  const handlePostOpportunity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("You must be logged in to post a collaboration opportunity")
      return
    }
    const opportunity: CollaborationOpportunity = {
      ...newOpportunity,
      id: Date.now().toString(),
      postedBy: user.username,
      postedDate: new Date().toISOString().split("T")[0],
    }
    setOpportunities([opportunity, ...opportunities])
    setShowPostForm(false)
    setNewOpportunity({
      title: "",
      description: "",
      skills: [],
    })
  }

  const handleAddSkill = (skill: string) => {
    if (skill && !newOpportunity.skills.includes(skill)) {
      setNewOpportunity({
        ...newOpportunity,
        skills: [...newOpportunity.skills, skill],
      })
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setNewOpportunity({
      ...newOpportunity,
      skills: newOpportunity.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Collaboration Opportunities</h1>
        {user && (
          <button
            onClick={() => setShowPostForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Post Opportunity
          </button>
        )}
      </div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search opportunities..."
            className="flex-grow px-4 py-2 border rounded-l bg-white dark:bg-zinc-900"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            <Search size={20} />
          </button>
        </div>
      </form>
      <div className="space-y-6">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-2">{opportunity.title}</h2>
            <p className="mb-4">{opportunity.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.skills.map((skill, index) => (
                <span key={index} className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <Link href={`/user/${opportunity.postedBy}`} className="text-blue-500 hover:underline">
                Posted by {opportunity.postedBy}
              </Link>
              <div className="text-sm text-gray-500">Posted on {opportunity.postedDate}</div>
            </div>
            <button
              onClick={() => {
                /* Implement direct messaging */
              }}
              className="mt-4 flex items-center text-blue-500 hover:underline"
            >
              <MessageCircle size={16} className="mr-2" />
              Contact for Collaboration
            </button>
          </div>
        ))}
      </div>
      {showPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Post Collaboration Opportunity</h2>
            <form onSubmit={handlePostOpportunity} className="space-y-4">
              <input
                type="text"
                value={newOpportunity.title}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
                placeholder="Opportunity Title"
                className="w-full px-3 py-2 border rounded"
                required
              />
              <textarea
                value={newOpportunity.description}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                placeholder="Opportunity Description"
                className="w-full px-3 py-2 border rounded"
                rows={4}
                required
              ></textarea>
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills Needed</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newOpportunity.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add a skill"
                    className="flex-grow px-3 py-2 border rounded-l"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddSkill(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a skill"]') as HTMLInputElement
                      handleAddSkill(input.value)
                      input.value = ""
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-r hover:bg-green-600"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowPostForm(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Post Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

