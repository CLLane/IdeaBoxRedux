var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideasArray = [];

localStorage.setItem('ideas array', ideasArray);

saveButton.addEventListener('click', saveFunction)

function saveFunction(e) {
  e.preventDefault();
  var uniqueId = Date.now();
  var ideaTest = new Idea(uniqueId, titleInput.value, bodyInput.value);
  console.log(ideaTest);
  ideaTest.saveToLocalStorage();
  ideasArray.push(ideaTest);
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
  // populateNewCard(); 
  // clearInputFields();
}

function instantiateIdeas() {
  var parsedArray = JSON.parse(localStorage.getItem('ideas array'));
  console.log(parsedArray);
  parsedArray.forEach(function (arrayItem){
    new Idea(arrayItem.id, arrayItem.title, arrayItem.body);
    console.log(arrayItem);
  })

}

// instantiateIdeas();

// function populateNewCard() {
//   //insert adjacent HTML into card-section section
//   //take bodyInput.value and titleInput.value and place into card
// }

// function saveToLocalStorage() {
//   //should this be a method invoked on the new Idea instance? 
//   //how do we do this?
// }











//Disable Save Button unless all the inputs are filled///
titleInput.addEventListener('keyup', enableSaveButton)
bodyInput.addEventListener('keyup', enableSaveButton)

function enableSaveButton() {
    var inputFields =[
    titleInput.value,
    bodyInput.value
    ];
    for(var i = 0; i < inputFields.length; i++){
        if (inputFields[i].length < 1) {
            saveButton.disabled = true;
            return;
        } else {
            saveButton.disabled = false;
        };
    };
};


