import { supabase } from '../supabaseClient';

export async function updateTaskCompletion(taskId, completed) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', taskId)
    .select();

  if (error) throw error;
  return data[0];
}

export async function deleteTask(taskId) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  if (error) throw error;
}