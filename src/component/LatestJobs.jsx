
import { useEffect, useState } from "react";
import { Link } from "react-router";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobs?limit=6")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        Latest Jobs
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {jobs.map(job => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.category}</p>
            <p className="font-semibold text-indigo-700 mb-4">
              Budget: ${job.budget}
            </p>
            <Link to={`/jobs/${job._id}`}>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestJobs;
