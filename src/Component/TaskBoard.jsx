import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Task from "./Task";

const socket = io("http://localhost:4000");

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch tasks from backend
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4000/tasks");
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();

    // Listen for real-time updates from WebSocket
    socket.on("taskCreated", (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
    });

    socket.on("taskDeleted", ({ id }) => {
      setTasks((prev) => prev.filter((task) => task._id !== id));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const categories = ["To Do", "In Progress", "Done"];

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="font-bold text-xl mb-4">{category}</h2>
            {/* Filter and map tasks based on the status */}
            {tasks
              .filter((task) => task.status === category)
              .map((task) => (
                <div className="mt-4" key={task._id}>
                  <Task task={task} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
