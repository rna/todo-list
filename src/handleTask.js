import {saveToBrowser,readFromBrowser} from './browserStorage';
import { Task } from './prototypes';

export let projects = readFromBrowser() || [];

export const handleTask = (function(){

 const addTask = (store, obj) => {
    store.push(obj);
    saveToBrowser(projects);
  }

  const editTask = (project,task) => {
    let id = project.todos.findIndex(e => e.title === task.title);
    
    let title = document.getElementById('editTitle');
    let description = document.getElementById('editDescription');
    let date = document.getElementById('editDate');
    let priority = document.getElementById('editPriority');
    let selectProjects = document.getElementById('editSelectProjects');

    title.value=task.title;
    description.value =task.description;
    date.value=task.dueDate;
    priority.value=task.priority;
    selectProjects.value=project.name;
    

    //update Details

    const updateTask = document.getElementById('editDoForm');
    updateTask.addEventListener('submit', (e) => {
      const uTitle = title.value;
      const uDescription = description.value;
      const uDueDate = date.value;
      const uPriority = priority.value;
      const projectName = selectProjects.value;
      
      const newProject = projects.find(e => e.name == projectName);

      if (projectName !== project.name){
        let index = project.todos.findIndex(e => e.title === task.title);
        project.todos.splice(index,1);
      }
      newProject.todos[id] = new Task(uTitle,uDescription,uDueDate,uPriority);
      saveToBrowser(projects);
      location.reload();
      e.preventDefault();
    })
  }

  const deleteTask = (project,task,click) => {
    let id = project.todos.findIndex(e => e.title === task.title);
    let clickDiv = click.target.parentNode.parentNode.parentNode.parentNode;
    
    project.todos.splice(id,1);
    clickDiv.remove();
    saveToBrowser(projects);
    console.log(project.todos);
  }

  return {
    addTask,
    editTask,
    deleteTask
  }
})();