let taskStore = [];

function handleTask(){
    
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

let task1 = new Task("Test Task1", "Description about Test", "Today","p1");
let task2 = new Task("Test Task2", "Description about Test", "Today","p2");

let newhandle = new handleTask();

newhandle.addTask(task1);
newhandle.addTask(task2);

console.log(taskStore);