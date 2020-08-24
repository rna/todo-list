const saveToBrowser = (projects) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const readFromBrowser = () => {
  const localObj = localStorage.getItem('projects');
  if (localObj === null) {
    return null;
  }
  return JSON.parse(localObj);
};

export { saveToBrowser, readFromBrowser };