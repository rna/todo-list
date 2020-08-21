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
  
    const descriptionField = document.createElement('input');
    descriptionField.type = 'text';
    descriptionField.placeholder = 'Enter Description';
    descriptionField.name = 'description';
    descriptionField.id = 'description';
  
    const dateField = document.createElement('input');
    dateField.type = 'text';
    dateField.placeholder = 'Enter Due Date';
    dateField.name = 'date';
    dateField.id = 'date';
  
    const priorityField = document.createElement('input');
    priorityField.type = 'text';
    priorityField.placeholder = 'Enter Priority';
    priorityField.name = 'priority';
    priorityField.id = 'priority';
  
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Add ToDo';
    submitButton.id = 'taskSubmitButton';
  
    doForm.appendChild(titleField);
    doForm.appendChild(descriptionField);
    doForm.appendChild(dateField);
    doForm.appendChild(priorityField);
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
          <p>${task.title} - ${task.dueDate}</p>
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
      <p>${task.description}</p>
        <p>${task.priority}</p>
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
    dateField.type = 'text';
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

  return {
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