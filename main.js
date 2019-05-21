var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideasArray = [];

// localStorage.setItem('ideas array', ideasArray);

saveButton.addEventListener('click', saveFunction)

function saveFunction(e) {
  e.preventDefault();
  var uniqueId = Date.now();
  var ideaTest = new Idea(uniqueId, titleInput.value, bodyInput.value);
  ideaTest.saveToLocalStorage();
  ideasArray.push(ideaTest);
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
  // populateNewCard(); 
  // clearInputFields();
}

function instantiateIdeas() {
  var parsedArray = JSON.parse(localStorage.getItem('ideas array'));
  var newArray = parsedArray.map(function (arrayItem){
    return new Idea(arrayItem.id, arrayItem.title, arrayItem.body);
  })
  console.log(newArray)
  ideasArray = parsedArray;

}

instantiateIdeas();

// function populateNewCard() {
//   //insert adjacent HTML into card-section section
//   //take bodyInput.value and titleInput.value and place into card
// }



