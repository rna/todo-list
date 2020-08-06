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


const projectList = (radioForm, projects) => {
  
  projects.forEach(element => {  
    addRadioButton(radioForm,element.name);
  });

  return radioForm;
}

const listNewProject = (radioForm, projects) => {
  
  addRadioButton(radioForm,projects[projects.length-1].name);

  return radioForm;
}

export { projectList, listNewProject }