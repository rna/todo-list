import Project from './project';
import Task from './handleTask';
import { todoForm, projectForm, displayProjects, listNewProject, displayTasks, createDivs, sideProjects } from './dom';
import {saveToBrowser,readFromBrowser} from './browserStorage';
import './style.css';

let projects = readFromBrowser() || [] ;
if(projects == []){
 const defaultProject = new Project("Inbox");
 projects.push(defaultProject);
}

const rendr = document.getElementById('container');

rendr.appendChild(createDivs());
rendr.appendChild(todoForm());

const side = document.getElementById('sidebar');
const mainDiv = document.getElementById('mainDiv');

const radioForm = document.getElementById('doForm');
mainDiv.appendChild(projectForm());
mainDiv.appendChild(displayProjects(radioForm, projects));
side.appendChild(sideProjects(projects));
mainDiv.appendChild(displayTasks(projects[0].todos));

//create a new project
const projectF = document.getElementById('projectform');
projectF.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  const newProject = new Project(name);
  projects.push(newProject);
  rendr.appendChild(listNewProject(radioForm, projects));
  saveToBrowser(projects);
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
  let list = rendr.childNodes[-1];  
  list.replaceChild(displayTasks(project.todos),list.childNodes[-1]);
  saveToBrowser(projects);
  console.log(projects);
  e.preventDefault();
})
