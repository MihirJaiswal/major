"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Categories for filtering
const categories = ["All", "Graphic Design", "Web Design", "Illustration", "Photography"]

// Project data with unique images
const projects = [
  {
    id: 1,
    title: "Project 1",
    author: "John Doe",
    image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
    category: "Graphic Design",
  },
  {
    id: 2,
    title: "Project 2",
    author: "Jane Smith",
    image: "https://images.pexels.com/photos/2760249/pexels-photo-2760249.jpeg",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Project 3",
    author: "Bob Johnson",
    image: "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg",
    category: "Illustration",
  },
  {
    id: 4,
    title: "Project 4",
    author: "Alice Brown",
    image: "https://images.pexels.com/photos/296283/pexels-photo-296283.jpeg",
    category: "Photography",
  },
]

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      (selectedCategory === "All" || project.category === selectedCategory) &&
      (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.author.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Discover Creative Work</h1>

      {/* Category Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="relative w-full max-w-xs mx-auto md:mx-0">
          <Input
            type="text"
            placeholder="Search projects or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Projects Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProjects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id} className="group block">
            <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Image */}
              <div className="w-full h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* Category Label */}
              <div className="absolute top-2 left-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-full">
                {project.category}
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{project.author}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
