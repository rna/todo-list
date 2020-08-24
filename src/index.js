import {Project, Task} from './prototypes';
import DOM from './dom';
import {saveToBrowser} from './browserStorage';
import {projects, handleTask} from './handleTask';
import './style.css';

const mainContainer = document.getElementById('container');
mainContainer.appendChild(DOM.createDivs());

if(projects.length == 0){
  const defaultProject = new Project("Inbox");
  projects.push(defaultProject);
  saveToBrowser(projects);
}

const sidebar = document.getElementById('sidebar');
const mainDiv = document.getElementById('mainDiv');
const showTasks = document.getElementById('taskDisplay');
const popupContent = document.getElementById('popup-content');

popupContent.appendChild(DOM.projectForm());
mainDiv.insertBefore(DOM.todoForm(),mainDiv.childNodes[1]);

const formNode = document.getElementById('doForm');
formNode.insertBefore(DOM.displayProjects(formNode, projects),formNode.childNodes[4]);
projects[0].length==0 ? null : DOM.displayAllTasks(showTasks, projects[0]);
sidebar.appendChild(DOM.sideProjects(projects));

//create a new project
const newProjectForm = document.getElementById('projectform');
newProjectForm.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  const newProject = new Project(name);
  projects.push(newProject);
  mainDiv.appendChild(DOM.listNewProject(formNode, projects));
  
  const sideProjectList = document.getElementById('sideProjectList');
  DOM.newSideProject(sideProjectList, newProject);
  saveToBrowser(projects);
  DOM.clearInput();
  DOM.closepopup();
  alert("Your project has been created");
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
  const projectName = document.getElementById('selectProjects').value;
  const project = projects.find(e => e.name == projectName);
  const newTask = new Task(title, description, dueDate, priority);
  handleTask.addTask(project.todos,newTask);
  Promise.resolve(showTasks.appendChild(DOM.showTask(newTask))).then(DOM.taskOption(project,newTask));
  DOM.clearInput();
  e.preventDefault();
})

// create popups
const addProjectBtn = document.getElementById('addProjectBtn');
addProjectBtn.addEventListener('click', () => {
  document.querySelector('.popup').style.display = 'flex';
});

document.getElementById('close').addEventListener('click', () => {
  document.querySelector('.popup').style.display = 'none';
});

const sides = document.getElementById('sideProjectList');
sides.addEventListener('click', () => {
  const theItem = document.getElementsByTagName("LI");
  // theItem[0].classList.remove('selected');
  // theItem[0].className += 'selected';
})
console.log(projects);
