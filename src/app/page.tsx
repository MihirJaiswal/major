import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectGrid from "@/components/Project";

const featuredProjects = [
  {
    id: 1,
    title: "Project 1",
    author: "John Doe",
    image: "https://virtualrealdesign.com/images/blogs/9405_blogWhy-is-web-design-important-for-businesses.jpg",
  },
  {
    id: 2,
    title: "Project 2",
    author: "Jane Smith",
    image: "https://designs.raleighswebsitedesign.com/wp-content/uploads/2023/02/25100515/JBR_Hero-1024x576.jpg",
  },
  {
    id: 3,
    title: "Project 3",
    author: "Bob Johnson",
    image: "https://htmlburger.com/blog/wp-content/uploads/2023/04/modern-websites-design-example-nightlife.jpg",
  },
  {
    id: 4,
    title: "Project 4",
    author: "Alice Brown",
    image: "https://i.ytimg.com/vi/nYrpf3VV62o/maxresdefault.jpg",
  },
];

export default function Home() {
  return (
    <div className="space-y-16 px-3 lg:px-16 dark:bg-gray-950 dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
        Showcase & Discover Creative Work
      </h1>
      <p className="md:text-xl text-gray-600 dark:text-gray-300 mb-8 md:max-w-2xl mx-auto">
        The leading destination to find & showcase creative work and home to the world's best design professionals.
      </p>
      <div className="flex justify-center space-x-4">
        <Button asChild size="lg">
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/discover">Discover</Link>
        </Button>
      </div>
    </section>

      {/* Featured Projects Section */}
      <ProjectGrid/>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gray-50 dark:bg-zinc-900 text-white rounded-md border border-gray-200 dark:border-zinc-800">
        <h2 className="text-4xl font-bold mb-4 text-black dark:text-gray-200">Ready to Join?</h2>
        <p className="text-xl font-light mb-8 text-black dark:text-gray-200">
          Share your portfolio with a global audience today.
        </p>
        <Button asChild className="px-8 py-4 font-semibold">
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </section>
    </div>
  );
}