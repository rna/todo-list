import Project from './project';
import Task from './handleTask';
import { todoForm, listNewTask, projectForm, displayProjects, listNewProject, displayTasks, createDivs, sideProjects } from './dom';
import {saveToBrowser,readFromBrowser} from './browserStorage';
import './style.css';


const mainContainer = document.getElementById('container');
mainContainer.appendChild(createDivs());

let projects = readFromBrowser() || [] ;
if(projects.length == 0){
 const defaultProject = new Project("Inbox");
 projects.push(defaultProject);
 saveToBrowser(projects);
}

const sidebar = document.getElementById('sidebar');
const mainDiv = document.getElementById('mainDiv');

mainDiv.appendChild(projectForm());
mainDiv.appendChild(todoForm());

const radioForm = document.getElementById('doForm');
mainDiv.appendChild(displayProjects(radioForm, projects));
sidebar.appendChild(sideProjects(projects));
projects[0].length==0 ? null : mainDiv.appendChild(displayTasks(projects[0].todos));

//create a new project
const newProjectForm = document.getElementById('projectform');
newProjectForm.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  const newProject = new Project(name);
  projects.push(newProject);
  mainDiv.appendChild(listNewProject(radioForm, projects));
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
  showTasks.appendChild(listNewTask(tasky));
  saveToBrowser(projects);
  e.preventDefault();
})

const showTasks = document.getElementById('taskDisplay');

projects.forEach(element => {
  document.getElementById(element.name).addEventListener('click',()=>{
    showTasks.innerHTML = "";
    showTasks.appendChild(displayTasks(element.todos))
  })
});