import {Project, Task} from './prototypes';
import DOM from './dom';
import {saveToBrowser,readFromBrowser} from './browserStorage';
import handleTask from './handleTask';
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
const popupContent = document.getElementById('popup-content');

popupContent.appendChild(DOM.projectForm());
mainDiv.insertBefore(DOM.todoForm(),mainDiv.childNodes[1]);

const formNode = document.getElementById('doForm');
formNode.insertBefore(DOM.displayProjects(formNode, projects),formNode.childNodes[4]);
projects[0].length==0 ? null : DOM.displayAllTasks(showTasks, projects[0].todos);
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
  const tasky = new Task(title, description, dueDate, priority);
  handleTask.addTask(project.todos,tasky);
  showTasks.appendChild(DOM.showTask(tasky));
  saveToBrowser(projects);
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


const deleteItem = () => {
  console.log("yes");
}

var result = (function () {
  var name = "Barry"; 
  return name; 
  })(); 

console.log(projects);
