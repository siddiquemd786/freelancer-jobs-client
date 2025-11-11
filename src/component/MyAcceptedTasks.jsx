import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { toast } from "react-hot-toast";
import ConfirmModal from "../component/ConfirmModal";
import { AuthContext } from "../context/AuthContext";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalTask, setModalTask] = useState(null); // task to delete

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/myAcceptedTasks?email=${user.email}`
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/acceptedTasks/${modalTask._id}`);
      toast.success("✅ Task removed successfully!");
      fetchTasks();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to remove task.");
    } finally {
      setModalTask(null);
    }
  };

  if (loading) return <p className="text-center py-20">Loading accepted tasks...</p>;

  return (
    <section className="py-16 px-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700">
        My Accepted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No accepted tasks yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 px-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-md overflow-hidden p-4 space-y-2"
            >
              <img
                src={task.coverImage || `https://picsum.photos/seed/${task._id}/600/400`}
                alt={task.title}
                className="h-40 w-full object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
              <p className="text-sm text-indigo-600">{task.category}</p>
              <p className="text-gray-600 text-sm line-clamp-3">{task.summary}</p>
              <div className="flex gap-2 mt-4">
                <a
                  href={`/update-job/${task.jobId}`}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Edit
                </a>
                <button
                  onClick={() => setModalTask(task)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {modalTask && (
        <ConfirmModal
          isOpen={!!modalTask}
          title="Confirm Removal"
          message="Are you sure you want to remove this accepted task?"
          onConfirm={handleDelete}
          onCancel={() => setModalTask(null)}
        />
      )}
    </section>
  );
};

export default MyAcceptedTasks;
