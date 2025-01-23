import Image from "next/image"
import Link from "next/link"

const freelancers = [
  { id: 1, name: "Alice Johnson", skill: "UI/UX Designer", avatar: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg" },
  { id: 2, name: "Bob Smith", skill: "Illustrator", avatar: "https://cdn.pixabay.com/photo/2023/09/01/14/24/boy-avtar-8227084_1280.png" },
  { id: 3, name: "Charlie Brown", skill: "Web Developer", avatar: "https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-with-cap-jacket_1142-42027.jpg" },
]

export default function HirePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200">Hire Freelancers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {freelancers.map((freelancer) => (
          <div
            key={freelancer.id}
            className="border border-gray-300 dark:border-zinc-600 rounded-md shadow-sm hover:shadow-md transition-shadow p-6 bg-white dark:bg-zinc-900"
          >
            <div className="flex items-center space-x-4 mb-4 rounded-full ">
              <Image
                src={freelancer.avatar || "/placeholder.svg"}
                alt={freelancer.name}
                width={120}
                height={120}
                quality={100}
                className="rounded-full border border-gray-300 h-16 w-16"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 ">{freelancer.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{freelancer.skill}</p>
              </div>
            </div>
            <Link
              href={`/user/${freelancer.id}`}
              className="text-blue-500 hover:underline text-sm font-medium"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
