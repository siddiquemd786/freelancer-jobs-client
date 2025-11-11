// src/pages/AllJobs.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import JobsGrid from "../component/JobsGrid";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center py-20"><span className="loading loading-bars loading-xl"></span></p>;

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        All Jobs
      </h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs available right now.</p>
      ) : (
        <JobsGrid jobs={jobs} />
      )}
    </section>
  );
};

export default AllJobs;
