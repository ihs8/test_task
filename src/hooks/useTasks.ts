
import { useState, useEffect, useCallback } from "react";
import { Task } from "../interfaces/Task";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (task: Task) => setTasks((prevTasks) => [...prevTasks, task]),
    []
  );

  const updateTask = useCallback(
    (updatedTask: Task) =>
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      ),
    []
  );

  const deleteTask = useCallback(
    (taskId: number) =>
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId)),
    []
  );

  return { tasks, addTask, updateTask, deleteTask };
};

export default useTasks;