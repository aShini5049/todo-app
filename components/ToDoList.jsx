"use client";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  // load tasks from localStorage when app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  //select the toggle button when task is completed
  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  //delete the added task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  //apply filters - all, completed and pending
  const filterTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; //all
  });

  return (
    <>
      <div className="bg-white p-8 rounded-[10px] shadow-md w-[400px] text-center mt-[70px]">
        <h1 className="text-2xl font-bold mb-[50px]">📝 To-Do List App</h1>

        {/*Input section + add button */}
        <div className="flex gap-[20px] mb-4">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={handleInputChange}
            className="flex-grow border border-gray-300 rounded-[5px] px-[8px] py-2 placeholder "
          />
          <button
            onClick={addTask}
            className="px-[15px] py-[10px] ml-[5px] border border-gray-500 rounded-[5px] bg-[#87CEFA] text-white cursor-pointer transition-colors duration-300 hover:bg-[#00BFFF]"
          >
            Add
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-[130px] justify-center mt-[50px]">
          <button
            onClick={() => setFilter("all")}
            className="cursor-pointer py-[5px] text-[20px] font-semibold rounded-[10px] border-[1px] bg-[#87CEFA] text-[#00008B] transition-colors duration-300 hover:bg-[#00BFFF]"
          >
            All
          </button>

          <button
            onClick={() => setFilter("completed")}
            className=" cursor-pointer py-[5px] text-[20px] font-semibold rounded-[10px] border-[1px]  bg-[#98FB98] text-[#006400] transition-colors duration-300 hover:bg-[#90EE90]"
          >
            Completed
          </button>

          <button
            onClick={() => setFilter("pending")}
            className="cursor-pointer py-[5px] text-[20px] font-semibold rounded-[10px] border-[1px]  bg-[#FFFFC5] text-[#8B8000] transition-colors duration-300 hover:bg-[#fffd8d]"
          >
            Pending
          </button>
        </div>

        {/* Task List */}
        <ol className="text-left list-decimal list-inside pl-6 mt-[50px]">
          {filterTasks.map((task) => (
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
