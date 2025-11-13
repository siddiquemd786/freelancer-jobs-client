import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`https://freelancer-jobs-server.vercel.app/allJobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedJob = {
      title: form.title.value,
      category: form.category.value,
      budget: parseFloat(form.budget.value),
      image: form.image.value,
      description: form.description.value,
    };

    await fetch(`https://freelancer-jobs-server.vercel.app/updateJob/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });

    alert("✅ Job updated successfully!");
    navigate("/myJobs");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        Update Job
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="title"
          defaultValue={job.title}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="category"
          defaultValue={job.category}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="budget"
          defaultValue={job.budget}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="image"
          defaultValue={job.image}
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          defaultValue={job.description}
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJobs;
