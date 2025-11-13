"use client";
import { useState } from "react";
import TaskItem from "./TaskItem";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
    }
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <>
      <div className="bg-white p-8 rounded-[10px] shadow-md w-[400px] text-center mt-[50px]">
        <h1 className="text-2xl font-bold mb-4">📝 To-Do List App</h1>

        <div className="flex gap-[20px] mb-4">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded-[5px] px-3 py-2 "
          />
          <button
            onClick={addTask}
            className="px-[15px] py-[10px] ml-[5px] border border-gray-500 rounded-[5px] bg-[#87CEFA] text-white cursor-pointer transition-colors duration-300 hover:bg-[#00BFFF]"
          >
            Add
          </button>
        </div>

        {/* ✅ Task list */}
        <ol className="text-left list-decimal list-inside pl-6 mt-[50px]">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
