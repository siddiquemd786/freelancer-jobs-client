import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const AddJobs = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const budget = parseFloat(form.budget.value);
    const image = form.image.value;
    const email = user?.email || "guest@example.com";

    const newJob = { title, category, description, budget, image, email };

    try {
      const res = await fetch("http://localhost:3000/addJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        Add a New Job
      </h2>

      <form onSubmit={handleAddJob} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          required
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget (USD)"
          required
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          required
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          required
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>

      {success && (
        <p className="text-green-600 text-center mt-3">
          ✅ Job added successfully!
        </p>
      )}
    </div>
  );
};

export default AddJobs;
