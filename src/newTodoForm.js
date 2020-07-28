const todoForm = () => {
  const doForm = document.createElement('form');
  doForm.id = 'doForm'
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

export default todoForm;