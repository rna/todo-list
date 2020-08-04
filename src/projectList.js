const addRadioButton = (eleForm, element) => {
  let radioButton = document.createElement('input')
    radioButton.type = "radio";
    radioButton.id = element;
    radioButton.name = element;
    radioButton.value = element;
    
    let radioLabel = document.createElement('label');
    radioLabel.for = element;
    radioLabel.innerHTML = element;
    
    eleForm.appendChild(radioButton);
    eleForm.appendChild(radioLabel);
}


const projectList = (projects) => {
  
  const radioForm = document.createElement('form');

  projects.forEach(element => {  
    addRadioButton(radioForm,element.name);
  });

  return radioForm;
}

const listNewProject = (projects) => {
  
  const radioForm = document.createElement('form');
  
  addRadioButton(radioForm,projects[projects.length-1].name);

  return radioForm;
}

export { projectList, listNewProject }