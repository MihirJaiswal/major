"use client"

import { useState } from "react"
import { useAuth } from "../../components/AuthProvider"
import Image from "next/image"

export default function ProfilePage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.username || "")
  const [bio, setBio] = useState("")
  const [website, setWebsite] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you'd make an API call to update the user's profile
    console.log("Profile updated:", { name, bio, website, skills })
  }

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <div className="mb-6 flex items-center space-x-4">
        <Image
          src={user?.profilePicture || "/placeholder.svg"}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Change Profile Picture</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="bio" className="block mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="website" className="block mb-1">
            Website
          </label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="skills" className="block mb-1">
            Skills
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-grow px-3 py-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Skill
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-gray-200 px-2 py-1 rounded flex items-center">
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
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save Profile
        </button>
      </form>
    </div>
  )
}

