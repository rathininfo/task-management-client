import { Pencil, Trash } from "lucide-react";

// Task component
const Task = ({ task, onEdit, onDelete }) => {
  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:4000/tasks/${task._id}`, {
        method: "DELETE",
      });
      onDelete(task._id); // Notify parent to remove task from UI
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleEdit = () => {
    onEdit(task); // Trigger the edit action (pass task data to parent)
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg relative">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-xs text-gray-500">Added {task.added}</p>
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={handleEdit} className="btn btn-sm btn-ghost">
          <Pencil size={16} />
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-ghost">
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};

export default Task;
