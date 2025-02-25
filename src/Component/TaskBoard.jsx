import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Task from "./Task";

const socket = io("http://localhost:4000");

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from backend
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));

    // Listen for real-time updates
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

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-bold text-lg mb-2">{category}</h2>
            {tasks
              .filter((task) => task.status === category)
              .map((task) => <div className="mt-2"><Task key={task._id} task={task} /></div>)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
