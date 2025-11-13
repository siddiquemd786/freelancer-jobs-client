import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`https://freelancer-jobs-server.vercel.app/myAddedJobs?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    await fetch(`https://freelancer-jobs-server.vercel.app/deleteJob/${id}`, { method: "DELETE" });
    setJobs(jobs.filter((job) => job._id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">
        My Added Jobs
      </h2>

      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={job.image}
                alt={job.title}
                className="h-48 w-full object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-2">{job.title}</h3>
              <p className="text-gray-500">{job.category}</p>
              <p className="text-indigo-600 font-bold">${job.budget}</p>

              <div className="mt-3 flex justify-between">
                <button
                  onClick={() => (window.location.href = `/updateJob/${job._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
