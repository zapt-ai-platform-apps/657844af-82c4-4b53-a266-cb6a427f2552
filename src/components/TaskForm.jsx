import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../supabaseClient';
import { TaskFormFields } from './TaskFormFields';

export function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title,
          description,
          due_date: dueDate,
          priority,
          category,
          user_id: user.id,
          completed: false
        }])
        .select();

      if (error) throw error;
      onTaskAdded(data[0]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <TaskFormFields
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        priority={priority}
        setPriority={setPriority}
        category={category}
        setCategory={setCategory}
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors cursor-pointer"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}