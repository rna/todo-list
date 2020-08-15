const DOM = (function(){
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
    submitButton.id = 'submitButton';
  
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
    submitButton.id = 'submitButton';
    form.appendChild(submitButton);
    return form;
  };
  
  const addRadioButton = (eleForm, element) => {
    let radioButton = document.createElement('input')
      radioButton.type = "radio";
      radioButton.id = element;
      radioButton.name = "project";
      radioButton.value = element;
      if (radioButton.id == "Inbox") {
        radioButton.checked = true;
      }
  
      let radioLabel = document.createElement('label');
      radioLabel.for = element;
      radioLabel.innerHTML = element;
      
      eleForm.appendChild(radioButton);
      eleForm.appendChild(radioLabel);
  }
  
  
  const displayProjects = (radioForm, projects) => {
    
    projects.forEach(element => {  
      addRadioButton(radioForm,element.name);
    });
  
    return radioForm;
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
      node.appendChild(item)
      document.getElementById(project.name).addEventListener('click',()=>{
        showTasks.innerHTML = "";
        // displayAllTasks(showTasks,project.todos)
      })
  }
  
  const listNewProject = (radioForm, projects) => {
    
    addRadioButton(radioForm,projects[projects.length-1].name);
  
    return radioForm;
  }

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
    
    
    allDivs.appendChild(navi);
    allDivs.appendChild(innerCont);
    innerCont.appendChild(sidebar);
    innerCont.appendChild(mainDiv);
    addProjectBtn.innerHTML = 'Add New Project';
    projectButtonCont.appendChild(addProjectBtn);
    mainDiv.appendChild(projectButtonCont);
    mainDiv.appendChild(taskDiv);
    taskDiv.appendChild(taskList);
  
    return allDivs;
  }

  const showTask = (task) => {
    const showTaskDiv = document.createElement('div');
    showTaskDiv.className = "eachTask";
    showTaskDiv.innerHTML = `
        <div class="minTask">
          <p>${task.title} - ${task.dueDate}</p>
          <div class="taskAction">
            <p><a id="editButton" href="">Edit</a></p>
            <p><a id="moreButton" href="">More</a></p>
            <p><a id="deleteButton" href="">X</a></p>
          </div>
        </div>
        <div class="maxTask" id="maxTask">
        </div>
    `;
    return showTaskDiv;
  }

  const taskDetail = (task) => {
    let moreTask = document.getElementById('moreButton');
    let maxTask = document.getElementById('maxTask');
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
  }

  const displayAllTasks = (node, arr) => {
    let actions = arr.map(task=>node.appendChild(showTask(task)));

    let results = Promise.all(actions);

    results.then(data => Promise.all(data.map(task => taskDetail(task))))
    
    // arr.forEach(task => {
    //   Promise.resolve(node.append(showTask(task))).then(taskDetail(task))
    // })
    // return node;
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
    taskDetail,
    createDivs
  }
})();

export default DOM;