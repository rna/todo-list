const selectProject = (projects) => {
  
  const radioForm = document.createElement('form');

  projects.forEach(element => {  
    let radioButton = document.createElement('input')
    radioButton.type = "radio";
    radioButton.id = element.name;
    radioButton.name = element.name;
    radioButton.value = element.name;
    
    let radioLabel = document.createElement('label');
    radioLabel.for = element.name;
    radioLabel.innerHTML = element.name;
    
    radioForm.appendChild(radioButton);
    radioForm.appendChild(radioLabel);
  });

  return radioForm;
}

export default selectProject;