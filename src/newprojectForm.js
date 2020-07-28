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

export default projectForm;