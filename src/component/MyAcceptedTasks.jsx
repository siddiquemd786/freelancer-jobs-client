// src/component/MyAcceptedTasks.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/myAcceptedTasks?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        My Accepted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t accepted any jobs yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
            >
              <img
                src={task.image}
                alt={task.title}
                className="h-48 w-full object-cover rounded-md"
              />
              <h3 className="text-lg font-bold mt-3">{task.title}</h3>
              <p className="text-gray-500">{task.category}</p>
              <p className="text-indigo-600 font-semibold">${task.budget}</p>
              <p className="text-sm text-gray-400 mt-2">
                Accepted on: {new Date(task.acceptedDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAcceptedTasks;
