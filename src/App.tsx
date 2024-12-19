import React, { useState, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useTasks from "./hooks/useTasks";
import { Task } from "./interfaces/Task";
import "./styles.css";
const App: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "In Progress" | "Done">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<"DueDateAsc" | "DueDateDesc" | "Status">("DueDateAsc");

 
  const handleEditTask = useCallback((task: Task) => {
    setTaskToEdit(task);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setTaskToEdit(null);
  }, []);

  const handleTaskSubmit = useCallback(
    (task: Task) => {
      if (taskToEdit) updateTask(task);
      else addTask(task);
      setTaskToEdit(null);
    },
    [taskToEdit, updateTask, addTask]
  );

  const handleDeleteTask = useCallback(
    (taskId: number) => {
      deleteTask(taskId);
    },
    [deleteTask]
  );


  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "All") return true;
    return task.status === filterStatus;
  });


  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (sortOption === "DueDateAsc") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortOption === "DueDateDesc") {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    } else if (sortOption === "Status") {
      const statusOrder: Record<Task["status"], number> = {
        Pending: 1,
        "In Progress": 2,
        Done: 3,
      };
      return statusOrder[a.status] - statusOrder[b.status];
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Task Management Dashboard</h1>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">Show All Tasks</option>
          <option value="Pending">Show Pending Tasks</option>
          <option value="In Progress">Show In Progress Tasks</option>
          <option value="Done">Show Done Tasks</option>
        </select>

 
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />


        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="DueDateAsc">Sort by Due Date (Ascending)</option>
          <option value="DueDateDesc">Sort by Due Date (Descending)</option>
          <option value="Status">Sort by Status</option>
        </select>
      </div>


      <TaskForm
        onSubmit={handleTaskSubmit}
        taskToEdit={taskToEdit}
        onCancel={handleCancelEdit}
      />


      <TaskList
        tasks={sortedTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default App;