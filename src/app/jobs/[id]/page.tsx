// src/app/jobs/[id]/page.tsx

import { notFound } from "next/navigation";

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
  }
];

// Fetch job data based on ID
const fetchJobById = (id: string) => {
  return initialJobs.find((job) => job.id === id) || null;
};

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = fetchJobById(params.id);

  if (!job) {
    // Handle non-existing job by rendering a "not found" page
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600 mb-2">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Type:</strong> {job.type}
      </p>
      <p className="text-gray-600 mb-6">{job.description}</p>
      <p className="text-sm text-gray-500">
        Posted by {job.postedBy} on {job.postedDate}
      </p>
    </div>
  );
}

// Generate static paths for the jobs
export async function generateStaticParams() {
  return initialJobs.map((job) => ({
    id: job.id,
  }));
}
