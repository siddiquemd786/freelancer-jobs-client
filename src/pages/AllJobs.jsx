// src/pages/AllJobs.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    axios
      .get("http://localhost:3000/alljobs")
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-20">Loading jobs...</p>;

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        All Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {jobs.map((job) => (
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
      )}
    </section>
  );
};

export default AllJobs;
