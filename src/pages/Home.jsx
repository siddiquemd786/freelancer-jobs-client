// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Spinner from "../component/Spinner";


export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
console.log(jobs)
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

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        All Available Jobs 💼
      </h2>

      <div className="overflow-x-auto shadow-lg border border-gray-100 rounded-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Cover</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Posted By</th>
              <th className="py-3 px-4 text-left">Summary</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job._id || index}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="py-3 px-4">
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-16 h-16 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 font-semibold text-gray-800">{job.title}</td>
                <td className="py-3 px-4 text-gray-600">{job.category}</td>
                <td className="py-3 px-4 text-gray-600">{job.postedBy}</td>
                <td className="py-3 px-4 text-gray-500 truncate max-w-xs">
                  {job.summary?.slice(0, 70)}...
                </td>
                <td className="py-3 px-4 text-center">
                  <Link
                    to={`/alljobs/${job._id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {jobs.length === 0 && (
          <p className="text-center py-10 text-gray-500">No jobs available yet.</p>
        )}
      </div>
    </div>
  );
}
