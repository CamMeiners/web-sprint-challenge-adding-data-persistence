// build your `Task` model here
const db = require('../../data/dbConfig');

async function getTasks() {
  const tasks = await db('tasks as t')
    .leftJoin('projects as pr', 't.project_id', 'pr.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'pr.project_name',
      'pr.project_description'
    );

  const tasksReturn = tasks.map((task) => {
    const newTask = {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: task.task_completed === 1 ? true : false,
      project_name: task.project_name,
      project_description: task.project_description,
    };
    return newTask;
  });
  return tasksReturn;
}

async function addTask(task) {
  const [task_id] = await db('tasks').insert(task, [
    'task_id',
    'task_notes',
    'task_description',
    'task_completed',
    'project_id',
  ]);
  const output = await db('tasks').where('task_id', task_id).first();
  if (output.task_completed) {
    output.task_completed = true;
  } else {
    output.task_completed = false;
  }
  return output;
}
module.exports = {
  getTasks,
  addTask,
};
