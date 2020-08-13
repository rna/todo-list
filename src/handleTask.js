const handleTask = (function(){
    
 const addTask = (store, obj) => {
    store.push(obj);
  }

  const updateTask = (id, objProp, value) => {
    taskStore[id-1][objProp] = value;
  }

  const deleteTask = (id) => {
    taskStore.splice(id-1,1);
  }

  return {
    addTask
  }
})();

export default handleTask;