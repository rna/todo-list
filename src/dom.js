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

const listNewProject = (radioForm, projects) => {
  
  addRadioButton(radioForm,projects[projects.length-1].name);

  return radioForm;
}

export {todoForm, projectForm, displayProjects, listNewProject};