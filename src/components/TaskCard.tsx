import React from "react";
import { Task } from "../interfaces/Task";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const statusColors: Record<Task["status"], string> = {
    Pending: "bg-yellow-200",
    "In Progress": "bg-blue-200",
    Done: "bg-green-200",
  };

  return (
    <div className={`p-4 rounded-md shadow-md ${statusColors[task.status]}`}>
      <h4 className="text-lg font-bold">{task.title}</h4>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
      <p className="text-sm font-medium">Status: {task.status}</p>
      <div className="flex justify-end mt-2 space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 bg-yellow-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};


export default React.memo(TaskCard);