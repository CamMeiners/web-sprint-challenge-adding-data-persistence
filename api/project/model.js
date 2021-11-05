// build your `Project` model here
const db = require('../../data/dbConfig');

async function getProjects() {
  const projects = await db('projects');
  const projectsReturn = projects.map((project) => {
    const newProject = {
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: project.project_completed === 1 ? true : false,
    };
    return newProject;
  });
  return projectsReturn;
}

async function addProject(project) {
  const [project_id] = await db('projects').insert(project, [
    'project_id',
    'project_name',
    'project_description',
    'project_completed',
  ]);
  const output = await db('projects').where('project_id', project_id).first();
  if (output.project_completed) {
    output.project_completed = true;
  } else {
    output.project_completed = false;
  }
  return output;
}
module.exports = {
  getProjects,
  addProject,
};
