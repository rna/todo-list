import projectForm from './newprojectForm';
import todoForm from './newTodoForm';
import Project from './project';
import Task from './handleTask';
const rendr = document.getElementById('container');
rendr.appendChild(projectForm());
rendr.appendChild(todoForm());

let projects = [];
//create a new project
const projectF = document.getElementById('projectform');
projectF.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;

  const newProject = new Project(name);
  projects.push(newProject);
  console.log(projects);

  e.preventDefault();
});

// create a new task inside a project
const createtask = document.getElementById('doForm');
createtask.addEventListener('submit', (e) => {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('date').value;
  const priority = document.getElementById('priority').value;
  //get a project
  const project = projects[0];

  const tasky = new Task(title, description, dueDate, priority);
  project.todos.push(tasky);
  console.log(projects)
  e.preventDefault();
})
