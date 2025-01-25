import React from 'react';
import { TaskItem } from './TaskItem';
import { updateTaskCompletion, deleteTask } from '../api/tasks';

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }) {
  const toggleCompletion = async (task) => {
    try {
      const updatedTask = await updateTaskCompletion(task.id, !task.completed);
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(taskId);
      onTaskDelete(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompletion={toggleCompletion}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}