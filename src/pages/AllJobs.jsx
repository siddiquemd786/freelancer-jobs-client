// src/pages/AllJobs.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/alljobs");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <p className="text-center py-20">Loading jobs...</p>;

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">All Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available right now.</p>
      ) : (
        <>
          {/* Table for desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Posted By</th>
                  <th className="px-4 py-2 text-left">Summary</th>
                  <th className="px-4 py-2 text-left">Cover Image</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{job.title}</td>
                    <td className="px-4 py-2">{job.category}</td>
                    <td className="px-4 py-2">{job.postedBy}</td>
                    <td className="px-4 py-2">{job.summary.slice(0, 80)}...</td>
                    <td className="px-4 py-2">
                      {job.coverImage ? (
                        <img
                          src={job.coverImage}
                          alt={job.title}
                          className="w-24 h-auto rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 space-x-2">
                      <Link
                        to={`/update-job/${job._id}`}
                        className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setModalJob(job)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/alljobs/${job._id}`}
                        className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden grid gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white border rounded-lg p-4 shadow">
                {job.coverImage && (
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">{job.title}</h3>
                <p className="text-gray-600 mb-1"><strong>Category:</strong> {job.category}</p>
                <p className="text-gray-600 mb-2"><strong>Posted By:</strong> {job.postedBy}</p>
                <p className="text-gray-700 mb-3">{job.summary.slice(0, 120)}...</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/update-job/${job._id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setModalJob(job)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/alljobs/${job._id}`}
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AllJobs;
