
function HandleTask(taskStore){
    
  this.addTask = (obj) => {
    taskStore.push(obj);
  }

  this.updateTask = (id, objProp, value) => {
    taskStore[id-1][objProp] = value;
  }

  this.getTask = (id) => {
    console.log(taskStore[id-1])
  }

  this.deleteTask = (id) => {
    taskStore.splice(id-1,1);
  }
}

function Task(title, description, dueDate, priority) {
  this.title = title,
  this.description = description,
  this.dueDate = dueDate,
  this.priority = priority
}

function Project(name) {
  this.name = name
  this.todos = [];
}

export {Project, Task}