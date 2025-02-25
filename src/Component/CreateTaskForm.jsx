import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const CreateTaskForm = ({ onCreate = () => {} }) => {
    const navigate = useNavigate()
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    added: new Date().toLocaleString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        onCreate(data); // Update the task board with the new task
        setTask({
          title: "",
          description: "",
          status: "To Do",
          added: new Date().toLocaleString(),
        }); // Reset the form

        // Show success message using SweetAlert2
        Swal.fire({
          title: "Task Created!",
          text: "Your task has been successfully created.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/")
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        
        // Show error message using SweetAlert2
        Swal.fire({
          title: "Error!",
          text: "There was an issue creating the task.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-700">
        Create New Task
      </h2>
      <div>
        <label htmlFor="title" className="block text-lg font-medium text-gray-600">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-lg font-medium text-gray-600">
          Task Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter task description"
          required
          className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
