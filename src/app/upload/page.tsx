"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../components/AuthProvider"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [isDraft, setIsDraft] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("You must be logged in to upload a project")
      return
    }
    // In a real application, you'd upload the files and create the project
    console.log("Uploading project:", { title, description, category, tags, files, isDraft })
    // Redirect to the project page (using a fake ID for this example)
    router.push("/project/new-project-id")
  }

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select a category</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="web-design">Web Design</option>
            <option value="illustration">Illustration</option>
            <option value="photography">Photography</option>
          </select>
        </div>
        <div>
          <label htmlFor="tags" className="block mb-1">
            Tags
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="tags"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-grow px-3 py-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="files" className="block mb-1">
            Project Files
          </label>
          <input
            type="file"
            id="files"
            onChange={(e) => setFiles(e.target.files)}
            multiple
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDraft"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="isDraft">Save as draft</label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          {isDraft ? "Save Draft" : "Publish Project"}
        </button>
      </form>
    </div>
  )
}

