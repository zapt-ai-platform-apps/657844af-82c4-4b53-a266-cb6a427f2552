import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { CalendarView } from './CalendarView';
import { supabase } from '../supabaseClient';
import { categories, priorities } from '../constants/filters';

export function MainContent({ tasks, filter, setFilter, fetchTasks }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">TaskMaster</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-7xl mx-auto space-y-8">
        <TaskForm onTaskAdded={fetchTasks} />
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="p-2 border rounded-md cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="p-2 border rounded-md cursor-pointer"
            >
              <option value="">All Priorities</option>
              {priorities.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
          <TaskList 
            tasks={tasks} 
            onTaskUpdate={fetchTasks}
            onTaskDelete={fetchTasks}
          />
        </div>

        <CalendarView tasks={tasks} />
      </main>

      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>Made on <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ZAPT</a></p>
      </footer>
    </div>
  );
}