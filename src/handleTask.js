const handleTask = (function(){
    
 const addTask = (store, obj) => {
    store.push(obj);
  }

  const editTask = (id, objProp, value) => {
    taskStore[id-1][objProp] = value;
  }

  const deleteTask = (task) => {
    console.log(task);
    // taskStore.splice(id-1,1);
  }

  return {
    addTask,
    deleteTask
  }
})();

export default handleTask;