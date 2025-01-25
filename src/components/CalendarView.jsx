import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay } from 'date-fns';

export function CalendarView({ tasks }) {
  const [date, setDate] = useState(new Date());

  const taskDates = tasks.reduce((acc, task) => {
    const taskDate = new Date(task.due_date).toDateString();
    acc[taskDate] = (acc[taskDate] || 0) + 1;
    return acc;
  }, {});

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null;
    const dateKey = date.toDateString();
    return taskDates[dateKey] ? (
      <div className="text-blue-600 text-sm mt-1">{taskDates[dateKey]}</div>
    ) : null;
  };

  const dailyTasks = tasks.filter(task => 
    task.due_date && isSameDay(new Date(task.due_date), date)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Calendar 
          onChange={setDate} 
          value={date} 
          tileContent={tileContent}
          className="border rounded-lg p-2"
        />
        <div>
          <h3 className="text-lg font-medium mb-4">
            Tasks for {format(date, 'MMMM do, yyyy')}
          </h3>
          {dailyTasks.length > 0 ? (
            dailyTasks.map(task => (
              <div key={task.id} className="mb-2 p-3 bg-gray-50 rounded">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">{task.category}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks due this day</p>
          )}
        </div>
      </div>
    </div>
  );
}