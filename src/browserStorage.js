const saveToBrowser = (projects) => {
  localStorage.setItem("projects",JSON.stringify(projects));  
}

const readFromBrowser = () => {
  let localObj = localStorage.getItem("projects");
  if (localObj === null) {
    return null;
  } else {
    return JSON.parse(localObj);
  }
}

const updateBrowser = () => {
  
}

const deleteInBrowser = () => {
  
}

export {saveToBrowser, readFromBrowser}