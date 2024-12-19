import React, { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  taskToEdit?: Task | null;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, taskToEdit, onCancel }) => {
  const [task, setTask] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (taskToEdit) setTask(taskToEdit);
  }, [taskToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.title && task.dueDate) {
      onSubmit({ ...task });
      setTask({ id: Date.now(), title: "", description: "", dueDate: "", status: "Pending" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md">
      <h3 className="text-lg font-bold">{taskToEdit ? "Edit Task" : "Add Task"}</h3>
      <div className="mb-4">
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Status</label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {taskToEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default React.memo(TaskForm);