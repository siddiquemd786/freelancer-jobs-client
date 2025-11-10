// src/pages/AddJobs.jsx
import { useState } from "react";

const AddJobs = () => {
  const [job, setJob] = useState({
    title: "",
    category: "",
    budget: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("✅ Job added successfully!");
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className="max-w-lg mx-auto py-10 px-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        Create a New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={job.category}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget (USD)"
          value={job.budget}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add Job
        </button>
      </form>
    </section>
  );
};

export default AddJobs;
