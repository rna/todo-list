const saveToBrowser = (projects) => {
  localStorage.setItem("projects",JSON.stringify(projects));  
}

const readFromBrowser = () => {
  return JSON.parse(localStorage.getItem("projects"));
}

const updateBrowser = () => {
  
}

const deleteInBrowser = () => {
  
}

export {saveToBrowser, readFromBrowser}