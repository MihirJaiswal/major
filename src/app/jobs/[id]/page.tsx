import { notFound } from "next/navigation";
import Link from "next/link";

// Sample job data
const initialJobs = [
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
];

// Fetch job data based on ID
const fetchJobById = (id: string) => {
  return initialJobs.find((job) => job.id === id) || null;
};

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = fetchJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg p-8 max-w-4xl mx-auto border border-gray-500 dark:border-gray-700 ">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">{job.title}</h1>
        <div className="space-y-4 mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Company:</span> {job.company}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Type:</span> {job.type}
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Job Description</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job.description}</p>
        </div>
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Posted by <span className="font-semibold">{job.postedBy}</span> on {job.postedDate}
          </p>
          <Link
            href={`/jobs/${job.id}/apply`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generate static paths for the jobs
export async function generateStaticParams() {
  return initialJobs.map((job) => ({
    id: job.id,
  }));
}
