// src/component/UpdateJob.jsx


import axios from "axios";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const UpdateJob = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

 
  useEffect(() => {
    axios
      .get(`http://localhost:3000/alljobs/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        toast.error("❌ Failed to load job data.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const updatedJob = {
      title: e.target.title.value,
      category: e.target.category.value,
      summary: e.target.summary.value,
      coverImage: e.target.coverImage.value,
    };

    try {
      await axios.put(`http://localhost:3000/alljobs/${id}`, updatedJob);
      toast.success("✅ Job updated successfully!");
      navigate("/alljobs"); // Redirect after update
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("❌ Failed to update job.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center py-20">Loading job details...</p>;

  return (
    <section className="max-w-3xl mx-auto py-24 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Update Job
      </h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-xl shadow-md space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={job.title}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={job.category}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select category</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Content Writing">Content Writing</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Mobile App">Mobile App</option>
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Summary</label>
          <textarea
            name="summary"
            rows="4"
            required
            defaultValue={job.summary}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            defaultValue={job.coverImage}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          {job.coverImage && (
            <img
              src={job.coverImage}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={updating}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update Job"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateJob;
