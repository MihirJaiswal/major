import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SearchPage() {
  // In a real application, you'd fetch search results based on the query
  const searchResults = [
    { id: 1, title: "Project 1", author: "John Doe", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Project 2", author: "Jane Smith", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "Project 3", author: "Bob Johnson", image: "/placeholder.svg?height=300&width=400" },
  ]

  return (
    <div>
      <div className="mb-8">
        <form className="flex items-center">
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
            <Search size={20} />
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {searchResults.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id} className="group">
            <div className="relative aspect-video mb-4">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.author}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

