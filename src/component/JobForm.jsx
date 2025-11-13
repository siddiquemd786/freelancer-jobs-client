// src/component/JobForm.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("https://freelancer-jobs-server.vercel.app/alljobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">FreelancerMarket</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-500">Home</a>
          <a href="/jobs" className="hover:text-blue-500">Jobs</a>
          <a href="/post-job" className="hover:text-blue-500">Post a Job</a>
          <a href="/login" className="hover:text-blue-500">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 bg-blue-100">
        <div className="space-y-4 max-w-lg">
          <h2 className="text-4xl font-bold">Find the perfect freelancer for your project</h2>
          <p className="text-gray-700">
            Connect with skilled freelancers across web development, marketing, design, and more.
          </p>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">Browse Jobs</button>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl">Post a Job</button>
          </div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="freelancer"
          className="w-80 mt-6 md:mt-0"
        />
      </section>

      {/* Featured Jobs */}
      <section className="p-10">
        <h3 className="text-2xl font-semibold mb-6">Latest Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
              <img src={job.coverImage} alt={job.title} className="h-40 w-full object-cover rounded-md mb-3" />
              <h4 className="text-xl font-bold">{job.title}</h4>
              <p className="text-gray-600">{job.category}</p>
              <p className="text-sm text-gray-500 mt-1">
                Posted by {job.postedBy} — {new Date(job.postedDate).toLocaleDateString()}
              </p>
              <button className="mt-4 text-blue-600 hover:underline">View Details →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 bg-gray-200 text-gray-600 mt-10">
        © 2025 FreelancerMarket — All Rights Reserved
      </footer>
    </div>
  );
}
