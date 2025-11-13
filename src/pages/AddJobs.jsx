// src/pages/AddJobs.jsx
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";


const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newJob = {
      title: form.title.value,
      postedBy: user?.displayName,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
      postedAt: new Date(),
    };

    try {
      const res = await axios.post("http://localhost:3000/alljobs", newJob);
      if (res.data.insertedId) {
        toast.success("✅ Job posted successfully!");
        form.reset();
      } else {
        toast.error("⚠️ Failed to post job. Try again.");
      }
    } catch (err) {
      console.error("Error adding job:", err);
      toast.error("❌ Something went wrong while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-24 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Add a New Job
      </h2>

      <form
        onSubmit={handleAddJob}
        className="bg-gray-50 dark:bg-[#081C34] border border-amber-300  text-gray-800 dark:text-gray-100 transition-all duration-500 p-8 rounded-xl shadow-md space-y-6"
      >
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter job title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Posted By (auto-filled) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Posted By
          </label>
          <input
            type="text"
            name="postedBy"
            value={user?.displayName || ""}
            disabled
            className="w-full border border-gray-200  rounded-lg px-4 py-2"
          />
        </div>

        {/* Category dropdown */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
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
            placeholder="Write a short job description..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          ></textarea>
        </div>

        {/* Cover Image URL */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="url"
            name="coverImage"
            required
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Email (auto-filled) */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            User Email
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            disabled
            className="w-full border border-gray-200  rounded-lg px-4 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddJob;
