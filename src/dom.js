import {handleTask, projects} from './handleTask';

const DOM = (function(){
  
  const createDivs = () => {
    const navi = document.createElement('nav');
    const innerCont = document.createElement('div');
    const sidebar = document.createElement('div');
    const mainDiv = document.createElement('div');
    const allDivs =document.createElement('div');
    const taskDiv = document.createElement('div');
    const taskList = document.createElement('div');
    const projectButtonCont = document.createElement('div');
    const addProjectBtn = document.createElement('button');
    const popupCont = document.createElement('div');
    const popupContent = document.createElement('div');
    const closeButton = document.createElement('a');
    const editFormDiv = document.createElement('div');
  
    navi.className = 'navbar';
    navi.innerHTML = 'Todo List'
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    mainDiv.className = 'mainDiv';
    mainDiv.id = 'mainDiv';
    innerCont.className = 'innerCont';
    taskDiv.id = 'taskDiv';
    taskList.id = 'taskDisplay';
    projectButtonCont.id = 'projectBtnCont';
    addProjectBtn.id = 'addProjectBtn';
    popupCont.className = 'popup';
    popupCont.id = 'popup';
    popupContent.className = 'popup-content';
    popupContent.id = 'popup-content';
    closeButton.innerHTML = 'X';
    closeButton.id = 'close';
    editFormDiv.id = 'editFormDiv';


    popupContent.appendChild(closeButton);
    allDivs.appendChild(navi);
    popupCont.appendChild(popupContent);
    allDivs.appendChild(popupCont);
    allDivs.appendChild(innerCont);
    innerCont.appendChild(sidebar);
    innerCont.appendChild(mainDiv);
    addProjectBtn.innerHTML = 'Add New Project';
    projectButtonCont.appendChild(addProjectBtn);
    mainDiv.appendChild(projectButtonCont);
    mainDiv.appendChild(taskDiv);
    taskDiv.appendChild(taskList);
    mainDiv.appendChild(editFormDiv);
  
    return allDivs;
  }

  const todoForm = () => {
    const doForm = document.createElement('form');
    doForm.id = 'doForm';
    const titleField = document.createElement('input');
    titleField.type = 'text';
    titleField.placeholder = 'Enter Title';
    titleField.name = 'title';
    titleField.id = 'title';
    titleField.required = true;
  
    const descriptionField = document.createElement('input');
    descriptionField.type = 'text';
    descriptionField.placeholder = 'Enter Description';
    descriptionField.name = 'description';
    descriptionField.id = 'description';
    descriptionField.required = true;
  
    const dateField = document.createElement('input');
    dateField.type = 'date';
    dateField.placeholder = 'Enter Due Date';
    dateField.name = 'date';
    dateField.id = 'date';
    dateField.required = true;
  
    // const priorityField = document.createElement('input');
    // priorityField.type = 'text';
    // priorityField.placeholder = 'Enter Priority';
    // priorityField.name = 'priority';
    // priorityField.id = 'priority';
    // priorityField.required = true;

    const priorityField = document.createElement('select');
    const readOption1 = document.createElement('option');
    const readOption2 = document.createElement('option');
    const readOption3 = document.createElement('option');
    readOption1.appendChild(document.createTextNode('High'));
    readOption1.value = 'High';
    readOption2.appendChild(document.createTextNode('Medium'));
    readOption2.value = 'Medium';
    readOption3.appendChild(document.createTextNode('Low'));
    readOption3.value = 'Low';
    priorityField.appendChild(readOption1);
    priorityField.appendChild(readOption2);
    priorityField.appendChild(readOption3);
    priorityField.name = 'read status';
    priorityField.id = 'priority';
  
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Add ToDo';
    submitButton.id = 'taskSubmitButton';
  
    doForm.appendChild(titleField);
    doForm.appendChild(descriptionField);
    doForm.appendChild(dateField);
    doForm.appendChild(priorityField);
    // doForm.appendChild(readField)
    doForm.appendChild(submitButton);
    
    return doForm;
  }
  
  const projectForm = (name) => {
    const form = document.createElement('form');
    form.id = 'projectform'
    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.placeholder = 'Enter Project name';
    nameField.name = 'name';
    nameField.id = 'name';
    nameField.required = true;
    form.appendChild(nameField);
  
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Add Project';
    submitButton.id = 'projectSubmitButton';
    form.appendChild(submitButton);
    return form;
  };
  
  const addProjectDropDown = (selectForm, element) => {
      let projectOption = document.createElement('option');
      projectOption.value = element;
      projectOption.innerHTML = element;   
      selectForm.appendChild(projectOption);
  }
  
  const displayProjects = (node, projects) => {
    let selectOption = document.createElement('select')
      selectOption.id = "selectProjects";
      selectOption.name = "projects";

    projects.forEach(element => {  
      addProjectDropDown(selectOption,element.name);
    });
  
    return node.appendChild(selectOption);
  }
  
  const listNewProject = (node, projects) => {
    
    let projectSelect = document.getElementById('selectProjects');

    addProjectDropDown(projectSelect,projects[projects.length-1].name);
  
    return node.appendChild(projectSelect);
  }

  const sideProjects = (projects) => {
    const listing = document.createElement('ul');
    listing.id = 'sideProjectList';
    projects.forEach(element => {
      newSideProject(listing,element);
    })
    return listing;
  }

  const newSideProject = (node, project) => {
    const showTasks = document.getElementById('taskDisplay');
    const item = document.createElement('li');
      item.innerHTML = project.name;
      item.id = project.name;
      item.addEventListener('click',()=>{
        showTasks.innerHTML = "";
        displayAllTasks(showTasks,project);
      })
    return node.appendChild(item);
  }
  

  const showTask = (task) => {
    const showTaskDiv = document.createElement('div');
    showTaskDiv.className = "eachTask";
    showTaskDiv.innerHTML = `
        <div class="minTask">
          <p class="showdivs"><span class="displayed">Title: </span> <span>${task.title}</span></p>
          <p  class="showdivs"><span class="displayed">Due-Date: </span> <span>${task.dueDate}</span></p>
          <div class="taskAction">
            <p><a id="editButton-${task.title}" href="">Edit</a></p>
            <p><a id="moreButton-${task.title}" href="">More</a></p>
            <p><a id="deleteButton-${task.title}" href="">X</a></p>
          </div>
        </div>
        <div class="maxTask" id="maxTask-${task.title}">
        </div>
    `;
  
    return showTaskDiv;
  }

  const taskOption = (project,task) => {
    //more or less task function
    let moreTask = document.getElementById(`moreButton-${task.title}`);
    let maxTask = document.getElementById(`maxTask-${task.title}`);
    moreTask.addEventListener('click',(e)=>{
      if (moreTask.innerHTML == "More"){
        moreTask.innerHTML = "Less";
        maxTask.innerHTML = `
      <p><span class="displayed">Description: </span> ${task.description}</p>
        <p><span class="displayed" id="prior">Priority: </span> ${task.priority}</p>
      `;
      }
      else {
        moreTask.innerHTML="More";
        maxTask.innerHTML = "";
      }
      e.preventDefault();
    })

    //delete task
    let deleteButton =  document.getElementById(`deleteButton-${task.title}`);
    deleteButton.addEventListener('click',(e)=>{
      handleTask.deleteTask(project,task, e);
      e.preventDefault();
    });

    //edit task
    let editButton =  document.getElementById(`editButton-${task.title}`);
    editButton.addEventListener('click',(e)=>{
      addEditForm();
      handleTask.editTask(project,task);
      e.preventDefault();
    },{once:true});

  }

  const displayAllTasks = (node, project) => {

    project.todos.forEach(task => {
        Promise.resolve(node.append(showTask(task))).then(taskOption(project, task))
      })
      return node;
    }

  const addEditForm = () => {
    const editNode = document.getElementById('editFormDiv');
    const editDoForm = document.createElement('form');
    editDoForm.id = 'editDoForm';
    const titleField = document.createElement('input');
    titleField.type = 'text';
    titleField.placeholder = 'Enter Title';
    titleField.name = 'title';
    titleField.id = 'editTitle';
  
    const descriptionField = document.createElement('input');
    descriptionField.type = 'text';
    descriptionField.placeholder = 'Enter Description';
    descriptionField.name = 'description';
    descriptionField.id = 'editDescription';
  
    const dateField = document.createElement('input');
    dateField.type = 'date';
    dateField.placeholder = 'Enter Due Date';
    dateField.name = 'date';
    dateField.id = 'editDate';
  
    const priorityField = document.createElement('input');
    priorityField.type = 'text';
    priorityField.placeholder = 'Enter Priority';
    priorityField.name = 'priority';
    priorityField.id = 'editPriority';
  
    const updateButton = document.createElement('input');
    updateButton.type = 'submit';
    updateButton.value = 'Update ToDo';
    updateButton.id = 'taskUpdateButton';

    const cancelButton = document.createElement('input');
    cancelButton.type = 'button';
    cancelButton.value = 'Cancel';
    cancelButton.id = 'updateCancelButton';
  
    editDoForm.appendChild(titleField);
    editDoForm.appendChild(descriptionField);
    editDoForm.appendChild(dateField);
    editDoForm.appendChild(priorityField);
    displayProjectsinEditForm(editDoForm,projects);
    editDoForm.appendChild(updateButton);
    editDoForm.appendChild(cancelButton);
    
    editNode.appendChild(editDoForm);


    //cancel edit

    const cancelEditButton = document.getElementById('updateCancelButton');
    const editFormNode = document.getElementById('editFormDiv');
    cancelEditButton.addEventListener('click',()=>{
      editFormNode.innerHTML="";
    })
  }

  const displayProjectsinEditForm = (node, projects) => {
    let selectOption = document.createElement('select')
      selectOption.id = "editSelectProjects";
      selectOption.name = "projects";

    projects.forEach(element => {  
      addProjectDropDown(selectOption,element.name);
    });
  
    return node.appendChild(selectOption);
  }

  const clearInput = () => {
    document.getElementById('doForm').reset();
    document.getElementById('projectform').reset();
  }

  const closepopup = () => {
    document.getElementById('popup').style.display = 'none';
  }

  return {
    clearInput,
    closepopup,
    projectForm,
    todoForm,
    displayProjects,
    listNewProject,
    sideProjects,
    newSideProject,
    displayAllTasks,
    showTask,
    taskOption,
    createDivs
  }
})();

export default DOM;