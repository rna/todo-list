import projectForm from './newprojectForm';
import todoForm from './newTodoForm';
import Project from './project';
import Task from './handleTask';
import { projectList, listNewProject } from './projectList';

let projects = [];
const defaultProject = new Project("Inbox");
projects.push(defaultProject);
const rendr = document.getElementById('container');
<<<<<<< HEAD
=======
const radioForm = document.createElement('form');
radioForm.id = 'radioForm';
>>>>>>> c463940ccbf72d86d6d7b60eff0023566d0f9de1

rendr.appendChild(projectForm());
rendr.appendChild(todoForm());

const radioForm = document.getElementById('doForm');
rendr.appendChild(projectList(radioForm, projects));

document.getElementById('Inbox').checked = true;


function getRadioVal(form, name) {
  var val;

  var radios = form.elements[name];
  console.log(radios)
  var len = radios.length;
  for (var i = 0; i < len; i++) {
    if (radios[i].checked == true) {
      val = radios[i].value;

      break;
    }
  }

  return val;
}

//create a new project
const projectF = document.getElementById('projectform');
projectF.addEventListener('submit', (e) => {
  const name = document.getElementById('name').value;
  const newProject = new Project(name);
  projects.push(newProject);
  console.log(projects);
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
<<<<<<< HEAD
=======
  //get a project
  x = document.getElementById('radioForm');
  const project = getRadioVal(x, 'project');
  
>>>>>>> c463940ccbf72d86d6d7b60eff0023566d0f9de1

  //get a project
  const projectName = document.querySelector('input[name="project"]:checked').value;
  const project = projects.find(e => e.name == projectName);
  const tasky = new Task(title, description, dueDate, priority);
  project.todos.push(tasky);
  console.log(projects);
  e.preventDefault();
})
let r = document.getElementById('radioForm');
var valy = getRadioVal(r, 'project' );
console.log(valy);