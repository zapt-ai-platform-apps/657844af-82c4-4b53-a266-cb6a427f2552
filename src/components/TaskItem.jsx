import React from 'react';
import { priorityColors } from '../constants/taskConfig';

export function TaskItem({ task, toggleCompletion, handleDelete }) {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm border-l-4"
      style={{ borderColor: priorityColors[task.priority] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompletion(task)}
            className="w-5 h-5 cursor-pointer"
          />
          <div className="flex-1">
            <h3 className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm">{task.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="px-2 py-1 text-sm rounded-full bg-gray-100">
                {task.category}
              </span>
              {task.due_date && (
                <span className="text-sm text-gray-500">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => handleDelete(task.id)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}