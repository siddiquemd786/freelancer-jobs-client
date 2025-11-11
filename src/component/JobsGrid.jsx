
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { Link } from "react-router";

const JobsGrid = ({ job, refreshJobs, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/alljobs/${job._id}`);
      toast.success("✅ Job deleted successfully!");
      refreshJobs();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to delete job.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="h-40 w-full overflow-hidden">
          <img
            src={job.coverImage || `https://picsum.photos/seed/${job._id}/600/400`}
            alt={job.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-indigo-600">{job.category}</p>
          <p className="text-gray-600 text-sm line-clamp-3">{job.summary}</p>
          <div className="mt-3 text-xs text-gray-500">
            Posted By: <span className="font-medium text-gray-700">{job.postedBy}</span>
          </div>

          <div className="mt-4 flex gap-2">
  <Link
    to={`/update-job/${job._id}`}
    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
  >
    Edit
  </Link>
  <button
    onClick={() => setIsModalOpen(true)}
    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
  >
    Delete
  </button>
</div>


          <div className="mt-2">
            <Link
              to={`/alljobs/${job._id}`}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </article>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this job?"
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default JobsGrid;
