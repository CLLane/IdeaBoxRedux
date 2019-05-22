var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideasArray = [];

saveButton.addEventListener('click', saveFunction)

function saveFunction(e) {
  e.preventDefault();
  var newIdeaInstance = new Idea(Date.now(), titleInput.value, bodyInput.value);
  newIdeaInstance.saveToLocalStorage();
  ideasArray.push(newIdeaInstance);
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
  clearInputFields();
  // populateNewCard(); 
}

function instantiateIdeas() {
  var newArray = JSON.parse(localStorage.getItem('ideas array')).map(function (arrayItem){
    return new Idea(arrayItem.id, arrayItem.title, arrayItem.body);
  })
  console.log(newArray)
  ideasArray = newArray;
}

function clearInputFields() {
  titleInput.value = '';
  bodyInput.value = '';
}

instantiateIdeas();

// function populateNewCard() {




