import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { MainContent } from './components/MainContent';
import { AuthScreen } from './components/AuthScreen';
import { supabase } from './supabaseClient';

export default function App() {
  const { user, loading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ category: '', priority: '' });

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, filter]);

  const fetchTasks = async () => {
    try {
      let query = supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date', { ascending: true });

      if (filter.category) query = query.eq('category', filter.category);
      if (filter.priority) query = query.eq('priority', filter.priority);

      const { data, error } = await query;
      if (error) throw error;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return !user ? (
    <AuthScreen />
  ) : (
    <MainContent
      tasks={tasks}
      filter={filter}
      setFilter={setFilter}
      fetchTasks={fetchTasks}
    />
  );
}