import Image from "next/image"
import Link from "next/link"

const freelancers = [
  { id: 1, name: "Alice Johnson", skill: "UI/UX Designer", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Bob Smith", skill: "Illustrator", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Charlie Brown", skill: "Web Developer", avatar: "/placeholder.svg?height=100&width=100" },
]

export default function HirePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Hire Freelancers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <div key={freelancer.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={freelancer.avatar || "/placeholder.svg"}
                alt={freelancer.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">{freelancer.name}</h2>
                <p className="text-gray-600">{freelancer.skill}</p>
              </div>
            </div>
            <Link href={`/user/${freelancer.id}`} className="text-blue-500 hover:underline">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

