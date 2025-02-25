import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";

const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  // Handle delete task with SweetAlert2 confirmation
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });
  
    if (result.isConfirmed) {
      try {
        console.log("Attempting to delete task with ID:", task._id);
  
        const response = await fetch(`http://localhost:4000/tasks/${task._id}`, {
          method: "DELETE",
        });
  
        // Log the response status to debug
        console.log("Response from server:", response);
  
        if (response.ok) {
          if (typeof onDelete === "function") {
            onDelete(task._id); // Notify parent component about the delete
          } else {
            console.error("onDelete is not a function!");
          }
        } else {
          throw new Error("Failed to delete task");
        }
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };
  
  // Handle edit task
  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  // Handle save edited task with SweetAlert2 success or error
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onEdit(updatedTask); // Notify parent component about the update
        setIsEditing(false); // Disable editing mode
        Swal.fire("Success!", "Your task has been updated.", "success");
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Failed to save task", error);
      Swal.fire("Error!", "There was an issue saving the task.", "error");
    }
  };

  // Handle input changes during edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg relative transition duration-300 hover:shadow-xl">
      {isEditing ? (
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:text-fuchsia-400"
              placeholder="Edit task title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Task Description
            </label>
            <textarea
              name="description"
              id="description"
              value={editedTask.description}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:text-fuchsia-400"
              rows="4"
              placeholder="Edit task description"
            />
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleSave}
              className="w-32 text-fuchsia-400 text-white p-2 rounded-md hover:text-fuchsia-600 transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-32 border border-gray-300 text-gray-600 p-2 rounded-md hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{task.description}</p>
          <p className="text-xs text-gray-500 mt-2">Added {task.added}</p>
          <div className="absolute top-2 right-2 flex gap-3">
            <button
              onClick={handleEdit}
              className="p-2 text-fuchsia-400 text-white rounded-full hover:text-fuchsia-600 transition"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
