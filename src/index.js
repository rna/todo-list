import Project from './project';
import Task from './handleTask';
import { todoForm, projectForm, displayProjects, listNewProject, displayNewTask, createDivs, sideProjects } from './dom';
import './style.css';

let projects = [];
const defaultProject = new Project("Inbox");
projects.push(defaultProject);

const rendr = document.getElementById('container');

rendr.appendChild(createDivs());
rendr.appendChild(projectForm());
rendr.appendChild(todoForm());

const side = document.getElementById('sidebar');

const radioForm = document.getElementById('doForm');
rendr.appendChild(displayProjects(radioForm, projects));
side.appendChild(sideProjects(projects));

//create a new project
const projectF = document.getElementById('projectform');
projectF.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  const newProject = new Project(name);
  projects.push(newProject);
  rendr.appendChild(listNewProject(radioForm, projects));
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
  const projectName = document.querySelector('input[name="project"]:checked').value;
  const project = projects.find(e => e.name == projectName);
  const tasky = new Task(title, description, dueDate, priority);
  project.todos.push(tasky);
  rendr.appendChild(displayNewTask(project.todos[0]));
  console.log(project.todos[0]);
  e.preventDefault();
})
