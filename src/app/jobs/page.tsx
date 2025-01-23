"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "../../components/AuthProvider"
import { Search, MapPin, Briefcase, X } from "lucide-react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  description: string
  postedBy: string
  postedDate: string
}

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Senior UI Designer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for an experienced UI Designer to join our team...",
    postedBy: "johndoe",
    postedDate: "2023-05-20",
  },
  {
    id: "2",
    title: "Freelance Illustrator",
    company: "ArtStudio",
    location: "New York, NY",
    type: "Contract",
    description: "Seeking a talented illustrator for a series of children's books...",
    postedBy: "janedoe",
    postedDate: "2023-05-19",
  },

  {
    id: "3",
    title: "Senior Frontend Developer",
    company: "WebSolutions",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for a Senior Frontend Developer to join our team...",
    postedBy: "johndoe",
    postedDate: "2023-05-18",
  },

]

export default function JobsPage() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [showPostJobForm, setShowPostJobForm] = useState(false)
  const [newJob, setNewJob] = useState<Omit<Job, "id" | "postedBy" | "postedDate">>({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredJobs = initialJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setJobs(filteredJobs)
  }

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("You must be logged in to post a job")
      return
    }
    const job: Job = {
      ...newJob,
      id: Date.now().toString(),
      postedBy: user.username,
      postedDate: new Date().toISOString().split("T")[0],
    }
    setJobs([job, ...jobs])
    setShowPostJobForm(false)
    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "",
      description: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Job Listings</h1>
        {user && (
          <button
            onClick={() => setShowPostJobForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            Post a Job
          </button>
        )}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            className="flex-grow px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
            <Search size={20} />
          </button>
        </div>
      </form>

      {/* Job Cards */}
      <div className="flex flex-col space-y-4 ">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{job.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{job.company}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center space-x-1">
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Briefcase size={16} />
                <span>{job.type}</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
            <div className="flex justify-between items-center">
              <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                View Details
              </Link>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Posted by {job.postedBy} on {job.postedDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Post Job Modal */}
      {showPostJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-2xl w-full shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Post a Job</h2>
              <button onClick={() => setShowPostJobForm(false)}>
                <X size={24} className="text-gray-800 dark:text-white" />
              </button>
            </div>
            <form onSubmit={handlePostJob} className="space-y-4">
              <input
                type="text"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                placeholder="Job Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                value={newJob.company}
                onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                placeholder="Company Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                placeholder="Location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
              <select
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
              <textarea
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                placeholder="Job Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={4}
                required
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPostJobForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
