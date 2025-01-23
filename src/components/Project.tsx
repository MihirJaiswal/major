import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Eye } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Vibrant Brand Identity",
    author: "Jane Doe",
    image: "https://picsum.photos/seed/1/800/600",
    likes: 1200,
    views: 5000,
    comments: 18,
  },
  {
    id: 2,
    title: "Minimalist Packaging Design",
    author: "John Smith",
    image: "https://picsum.photos/seed/2/800/600",
    likes: 950,
    views: 4200,
    comments: 23,
  },
  {
    id: 3,
    title: "Abstract Digital Art Collection",
    author: "Emily Johnson",
    image: "https://picsum.photos/seed/3/800/600",
    likes: 1500,
    views: 6300,
    comments: 32,
  },
  {
    id: 4,
    title: "Modern Architecture Photography",
    author: "Michael Brown",
    image: "https://picsum.photos/seed/4/800/600",
    likes: 800,
    views: 3800,
    comments: 15,
  },
  {
    id: 5,
    title: "Innovative UI/UX Design",
    author: "Sarah Lee",
    image: "https://picsum.photos/seed/5/800/600",
    likes: 2200,
    views: 8500,
    comments: 45,
  },
  {
    id: 6,
    title: "Creative Illustration Series",
    author: "David Wilson",
    image: "https://picsum.photos/seed/6/800/600",
    likes: 1800,
    views: 7200,
    comments: 38,
  },
]

export default function ProjectGrid() {
  return (
    <section className="px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id} className="group">
            <div className="bg-white dark:bg-zinc-900 rounded-sm overflow-hidden shadow-lg transition-transform duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <div className="relative aspect-video">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.author}</p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {project.likes}
                  </span>
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {project.views}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {project.comments}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

