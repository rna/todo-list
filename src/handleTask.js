import {saveToBrowser,readFromBrowser} from './browserStorage';

export let projects = readFromBrowser() || [];

export const handleTask = (function(){

 const addTask = (store, obj) => {
    store.push(obj);
    saveToBrowser(projects);
  }

  // const editTask = (id, objProp, value) => {
  //   taskStore[id-1][objProp] = value;
  // }

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
    deleteTask
  }
})();