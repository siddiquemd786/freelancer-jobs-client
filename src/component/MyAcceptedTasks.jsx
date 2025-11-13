// src/component/MyAcceptedTasks.jsx

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://freelancer-jobs-server.vercel.app/myAcceptedTasks?email=${user.email}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load accepted tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchTasks();
  }, [user]);

  // Handle DONE or CANCEL (removes task)
  const handleAction = async (taskId, actionType) => {
    try {
      await axios.delete(`https://freelancer-jobs-server.vercel.app/acceptedTasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success(
        actionType === "done" ? "✅ Task marked as done!" : "❌ Task cancelled!"
      );
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update task.");
    }
  };

  if (loading)
    return <p className="text-center py-20">Loading accepted tasks...</p>;

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-[#081C34]  text-gray-800 dark:text-gray-100 transition-all duration-500 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        My Accepted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No accepted tasks yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-6 ">
          {tasks.map((task) => (
            <div
              key={task._id}
              className=" bg-gray-50 dark:bg-[#081C34]  text-gray-800 dark:text-gray-100 rounded-xl shadow-md overflow-hidden p-4 space-y-2 transition hover:scale-105 duration-200"
            >
              <img
                src={
                  task.coverImage ||
                  `https://picsum.photos/seed/${task._id}/600/400`
                }
                alt={task.title}
                className="h-40 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-sm text-indigo-600">{task.category}</p>
              <p className="text-gray-600 text-sm line-clamp-3">{task.summary}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleAction(task._id, "done")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-1 flex justify-center items-center gap-1"
                >
                  ✅ Done
                </button>
                <button
                  onClick={() => handleAction(task._id, "cancel")}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex-1 flex justify-center items-center gap-1"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyAcceptedTasks;
