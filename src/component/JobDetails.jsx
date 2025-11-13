// src/component/JobDetails.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://freelancer-jobs-server.vercel.app/alljobs/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAccept = async () => {
    if (!user) {
      alert("Please login to accept this job.");
      navigate("/login");
      return;
    }

    const acceptedTask = {
  jobId: job._id,
  acceptedBy: user.email, // matches backend field
  title: job.title,
  category: job.category,
  summary: job.summary,
  coverImage: job.coverImage,
  postedBy: job.postedBy,
};


    try {
      setAccepting(true);
      await axios.post("https://freelancer-jobs-server.vercel.app/acceptedTasks", acceptedTask);

      alert("Job accepted successfully!");
      navigate("/my-accepted-tasks");
    } catch (error) {
      console.error("Error accepting job:", error);
      const msg = error.response?.data?.message || "Failed to accept job. Try again later.";
      alert(msg);
    } finally {
      setAccepting(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading job details...</p>;
  if (!job) return <p className="text-center py-20">Job not found.</p>;

  return (
    <section className="max-w-5xl mx-auto py-32 px-6 bg-gray-50 dark:bg-[#081C34] min-h-screen text-gray-800 dark:text-gray-100 transition-all duration-500 rounded-xl shadow-sm">
      {/* Cover image */}
      <div className="w-full h-64 mb-8 overflow-hidden rounded-lg">
        <img
          src={job.coverImage || `https://picsum.photos/seed/${job._id}/1000/600`}
          alt={job.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Job Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
        <p className="text-indigo-600 font-medium">{job.category}</p>
        <p className="text-gray-600">{job.summary}</p>

        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-sm text-gray-500">
              Posted By: <span className="font-semibold text-gray-800">{job.postedBy}</span>
            </p>
            {job.postedAt && (
              <p className="text-xs text-gray-400">
                {new Date(job.postedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <button
            onClick={handleAccept}
            disabled={accepting}
            className={`px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition ${
              accepting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {accepting ? "Accepting..." : "Accept Job"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
