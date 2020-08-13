import {Project, Task} from './prototypes';
import DOM from './dom';
import {saveToBrowser,readFromBrowser} from './browserStorage';
import './style.css';

const mainContainer = document.getElementById('container');
mainContainer.appendChild(DOM.createDivs());

let projects = readFromBrowser() || [] ;
if(projects.length == 0){
 const defaultProject = new Project("Inbox");
 projects.push(defaultProject);
 saveToBrowser(projects);
}

const sidebar = document.getElementById('sidebar');
const mainDiv = document.getElementById('mainDiv');
const showTasks = document.getElementById('taskDisplay');

mainDiv.appendChild(DOM.projectForm());
mainDiv.appendChild(DOM.todoForm());

const radioForm = document.getElementById('doForm');
mainDiv.appendChild(DOM.displayProjects(radioForm, projects));
projects[0].length==0 ? null : DOM.displayTasks(projects[0].todos);
sidebar.appendChild(DOM.sideProjects(projects));

//create a new project
const newProjectForm = document.getElementById('projectform');
newProjectForm.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  const newProject = new Project(name);
  projects.push(newProject);
  mainDiv.appendChild(DOM.listNewProject(radioForm, projects));
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
  showTasks.appendChild(DOM.listNewTask(tasky));
  saveToBrowser(projects);
  e.preventDefault();
})

projects.forEach(element => {
  document.getElementById(element.name).addEventListener('click',()=>{
    showTasks.innerHTML = "";
    showTasks.appendChild(DOM.displayTasks(element.todos))
  })
});