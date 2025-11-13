"use client";

export default function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="flex justify-between py-2 mt-[15px]">
      <div className="flex items-center gap-[10px]">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-6 h-6 accent-blue-500 cursor-pointer ml-[-20px] "
        />
        <span
          className={`transition-all duration-300 ${
            task.completed ? "line-through text-gray-300" : "text-gray-800"
          }`}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="px-[15px] py-[10px] mr-[20px] border border-gray-500 rounded-[5px] bg-[#FFDAB9] text-white cursor-pointer transition-colors duration-300 hover:bg-[#FFEFD5]"
      >
        Delete
      </button>
    </li>
  );
}
