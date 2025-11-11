// src/pages/AllJobs.jsx
import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const { user } = useContext(AuthContext);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/alljobs");
      const updatedJobs = res.data.map((job) => ({
        ...job,
        postedAt: job.postedAt || job.createdAt || new Date().toISOString(),
      }));
      setJobs(updatedJobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const handleDelete = async (id) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:3000/alljobs/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete");
    }

    alert("Job deleted successfully!");
    setJobs(prev => prev.filter(job => job._id !== id));
  } catch (error) {
    console.error("Delete error:", error);
    alert(error.message);
  }
};


  useEffect(() => {
    fetchJobs();
  }, []);

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const dateA = new Date(a.postedAt);
      const dateB = new Date(b.postedAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [jobs, sortOrder]);

  if (loading) return <p className="text-center py-20">Loading jobs...</p>;

  // Motion variants for subtle animation
  const fadeSlideVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-indigo-700">All Jobs</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {sortedJobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available right now.</p>
      ) : (
        <>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg text-sm">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="px-3 py-2 text-left">Cover</th>
                  <th className="px-3 py-2 text-left">Title</th>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">Posted By</th>
                  <th className="px-3 py-2 text-left">Date</th>
                  <th className="px-3 py-2 text-left w-[180px]">Summary</th>
                  <th className="px-3 py-2 text-left w-[200px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedJobs.map((job, i) => (
                  <motion.tr
                    key={job._id}
                    custom={i}
                    variants={fadeSlideVariant}
                    initial="hidden"
                    animate="visible"
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-3 py-2">
                      {job.coverImage ? (
                        <img
                          src={job.coverImage}
                          alt={job.title}
                          className="w-16 h-12 rounded object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-3 py-2">{job.title}</td>
                    <td className="px-3 py-2">{job.category}</td>
                    <td className="px-3 py-2">{job.postedBy}</td>
                    <td className="px-3 py-2 text-gray-500">
                      {new Date(job.postedAt).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">{job.summary?.slice(0, 60)}...</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2 whitespace-nowrap">
                        <Link
                          to={`/update-job/${job._id}`}
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                        >
                          Edit
                        </Link>
                      {user && (
  <button
    onClick={() => handleDelete(job._id)}
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
  >
    Delete
  </button>
)}

                        <Link
                          to={`/alljobs/${job._id}`}
                          className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden grid gap-6">
            {sortedJobs.map((job, i) => (
              <motion.div
                key={job._id}
                custom={i}
                variants={fadeSlideVariant}
                initial="hidden"
                animate="visible"
                className="bg-white border rounded-lg p-4 shadow"
              >
                {job.coverImage && (
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  <strong>Category:</strong> {job.category}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Posted By:</strong> {job.postedBy}
                </p>
                <p className="text-gray-500 mb-1">
                  <strong>Date:</strong> {new Date(job.postedAt).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-3">{job.summary?.slice(0, 100)}...</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/update-job/${job._id}`}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
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
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default AllJobs;
