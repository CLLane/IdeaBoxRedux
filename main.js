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
titleInput.value === '' || bodyInput.value === '' ? saveButton.disabled = true: saveButton.disabled = false;  
}



//Populating Cards//

//QuerySelect the card table
var cardSection = document.querySelector('#card-section')


function abraCadabra(){
// Declare Variable for ideaCard
var ideaCard =  `<div class="card-top">
          <button class="star-button"><img src="images/star.svg"></button>
          <button class="delete-button"><img src="images/delete.svg"></button>
        </div>
        <h3>Idea title</h3>
        <p class="idea-body">Stuff things, other things and some more stuff, things stuffed with stuff and stuff made up of things that have stuff in them built by things that make stuff that are made from stuff become things</p>
        <div class="card-bottom">
          <button class="upvote-button"><img src="images/upvote.svg" class="upvote-svg"></button>
          <p class="quality-label">Quality:<span>Swill</span></p>
          <button class="downvote-button"><img src="images/downvote.svg"></button>
        </div>`
  //Interpolate the id, title, and body based





}

