var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var cardSection = document.querySelector('#card-section')
var ideasArray = [];

saveButton.addEventListener('click', saveFunction);
saveButton.addEventListener('click', enableSaveButton);
titleInput.addEventListener('keyup', enableSaveButton);
bodyInput.addEventListener('keyup', enableSaveButton);

instantiateIdeas();
populateCards();

function saveFunction(e) {
  e.preventDefault();
  var newIdeaInstance = new Idea(Date.now(), titleInput.value, bodyInput.value);
  ideasArray.push(newIdeaInstance);
  newIdeaInstance.saveToStorage();
  generateCard(newIdeaInstance);
  clearInputFields();
}

function instantiateIdeas() {
  if (localStorage.getItem('ideas array') === null){
    return
  }
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

function enableSaveButton() {
  titleInput.value === '' || bodyInput.value === '' ? saveButton.disabled = true: saveButton.disabled = false;  
}

cardSection.addEventListener('keydown', editContent);

cardSection.addEventListener('click', blurStuff);

function blurStuff(e) {
  var blurredItem = e.target;
  blurredItem.addEventListener('blur', function(){

  var ideaId = blurredItem.closest('.idea-card').getAttribute('data-id');

  var cardIndex = ideasArray.findIndex(function(arrayObj){
        return arrayObj.id === parseInt(ideaId);
  })  
  console.log (ideasArray[cardIndex])
  if (blurredItem.className === 'idea-title'){
    console.log('title was edited')
    console.log(blurredItem.innerText)
  }

  if (blurredItem.className === 'idea-body') {
    console.log('body was edited');
  }

})

  };





function editContent(e) {
  if (e.key === 'Enter') {
      e.target.blur()
      // console.log('hitting enter blur function firing');
  }
}

function populateCards(){
  for (var i = 0; i < ideasArray.length; i++) {
    generateCard(ideasArray[i]);
  }
}

function generateCard(newIdeaObject) {
  var ideaCard =  `<article class="idea-card" data-id="${newIdeaObject.id}"> 
          <div class="card-top" >
          <button class="star-button"><img src="images/star.svg"></button>
          <button class="delete-button"><img src="images/delete.svg" class="delete-button"></button>
        </div>
        <h3 class="idea-title" contenteditable="true">${newIdeaObject.title}</h3>
        <p class="idea-body" contenteditable="true">${newIdeaObject.body}</p>
        <div class="card-bottom">
          <button class="upvote-button"><img src="images/upvote.svg" class="upvote-svg"></button>
          <p class="quality-label">Quality:<span>Swill</span></p>
          <button class="downvote-button"><img src="images/downvote.svg"></button>
        </div>
        </article>`

        cardSection.insertAdjacentHTML('afterbegin', ideaCard);

}

cardSection.addEventListener('click', deleteCard);


function deleteCard(e){
  if (e.target.className === 'delete-button'){
    e.target.closest('.idea-card').remove();
    var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
    var cardIndex = ideasArray.findIndex(function(arrayObj){
        return arrayObj.id === parseInt(ideaId);
  
    });
    ideasArray[cardIndex].deleteFromStorage(cardIndex)
    ideasArray[0].saveToStorage(ideasArray);
    

    // ideasArray = updatedArray;
    // localStorage.setItem('ideas array', JSON.stringify(ideasArray));
    };
 };










