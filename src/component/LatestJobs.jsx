// src/component/LatestJobs.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router";
import JobCard from "./JobCard";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("https://freelancer-jobs-server.vercel.app/jobs?limit=6")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-[#081C34] min-h-screen text-gray-800 dark:text-gray-100 transition-all duration-500">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        Latest Jobs
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
