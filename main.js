var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var cardSection = document.querySelector('#card-section');
var searchBar = document.querySelector('#search-input');
var ideasArray = [];

titleInput.addEventListener('keyup', enableSaveButton);
bodyInput.addEventListener('keyup', enableSaveButton);
searchBar.addEventListener('keyup', searchFunction);
cardSection.addEventListener('keydown', listenForEnter);
cardSection.addEventListener('focusout', updateCard);
cardSection.addEventListener('click', cardSectionHandler);
saveButton.addEventListener('click', saveButtonHandler)
window.addEventListener('load', pageLoadHandler)


function pageLoadHandler() {
  instantiateIdeas();
  populateCards(ideasArray);
  noIdeasPrompt();
}

function cardSectionHandler(e) {
  deleteCard(e);
  noIdeasPrompt();
  saveStar(e);
  changeQualityHandler(e);
}

function saveButtonHandler(e) {
  saveFunction(e);
  enableSaveButton();
}

function searchFunction() {
  var searchInput = searchBar.value
  cardSection.innerHTML = "";
  var newArray = ideasArray.filter(function(arrayObject){
  return arrayObject.title.includes(searchInput) || arrayObject.body.includes(searchInput)
})
  populateCards(newArray);
}

function saveFunction(e) {
  e.preventDefault();
  var newIdeaInstance = new Idea(Date.now(), titleInput.value, bodyInput.value, bodyInput.starred);
  ideasArray.push(newIdeaInstance);
  newIdeaInstance.saveToStorage();
  generateCard(newIdeaInstance);
  clearInputFields();
  noIdeasPrompt();
}

function instantiateIdeas() {
  if (localStorage.getItem('ideas array') === null){
    return
  }
  var newArray = JSON.parse(localStorage.getItem('ideas array')).map(function (arrayItem){
    return new Idea(arrayItem.id, arrayItem.title, arrayItem.body, arrayItem.starred, arrayItem.quality);
  })
  ideasArray = newArray;
}

function clearInputFields() {
  titleInput.value = '';
  bodyInput.value = '';
}

function enableSaveButton() {
  titleInput.value === '' || bodyInput.value === '' ? saveButton.disabled = true: saveButton.disabled = false;  
}

function changeQualityHandler(e) {
  if (e.target.closest('.idea-card') !== null) {
    changeQuality(e);
  }
}

function changeQuality(e) {
  var index = getCardId(e);
  var newIdeaObject = ideasArray[index];
  if (e.target.className === 'upvote-button'){
    voteOrDie(e, index, newIdeaObject, 'upvote');
  }
  if (e.target.className === 'downvote-button'){
    voteOrDie(e, index, newIdeaObject, 'downvote');
  }
}

function voteOrDie(e, index, newIdeaObject, vote) {
  var span = e.target.closest('.card-bottom').querySelector('#quality-span');
  ideasArray[index].updateQuality(index, vote);
  span.innerText = newIdeaObject.qualityArray[newIdeaObject.quality]
}

function updateCard(e) { 
  var editedItem = e.target;
  var index = getCardId(e);
  if (editedItem.className === 'idea-title'){
    updateCardTitle (index, editedItem);
  }
  if (editedItem.className === 'idea-body') {
    updateCardBody (index, editedItem);
  }
};

function updateCardTitle (index, editedItem) {
  ideasArray[index].title = editedItem.innerText
  ideasArray[index].updateIdea(ideasArray[index].title, editedItem.innerText);
}

function updateCardBody (index, editedItem)  {
  ideasArray[index].body = editedItem.innerText;
  ideasArray[index].updateIdea(ideasArray[index].body, editedItem.innerText);
}

function listenForEnter(e) {
  if (e.key === 'Enter') {
      e.target.blur();
      updateCard(e);
  }
}

function populateCards(array){
  for (var i = 0; i < array.length; i++) {
    generateCard(array[i]);
  }
}

function generateCard(newIdeaObject) {
  var starStatus;
     if (newIdeaObject.starred === false){
      starStatus = "images/star.svg";
     } else {
      starStatus = "images/star-active.svg";
     }
  var ideaCard =  `<article class="idea-card" data-id="${newIdeaObject.id}"> 
          <div class="card-top" >
          <button class="star-button"><img src=${starStatus} class="star-image" id="star-image"></button>
          <button class="delete-button"><img src="images/delete.svg" class="delete-button"></button>
        </div>
        <h3 class="idea-title" contenteditable="true">${newIdeaObject.title}</h3>
        <p class="idea-body" contenteditable="true">${newIdeaObject.body}</p>
        <div class="card-bottom">
          <button class="upvote-button" id="upvote-button"><img src="images/upvote.svg" class="upvote-button"></button>
          <p class="quality-label">Quality:<span id="quality-span">${newIdeaObject.qualityArray[newIdeaObject.quality]}</span></p>
          <button class="downvote-button" id="downvote-button"><img src="images/downvote.svg" class='downvote-button'></button>
        </div>
        </article>`
  cardSection.insertAdjacentHTML('afterbegin', ideaCard);
}

function deleteCard(e){
  if (e.target.className === 'delete-button'){
    var index = getCardId(e);
    e.target.closest('.idea-card').remove();
    ideasArray[index].deleteFromStorage(index)
    };
  };


function noIdeasPrompt() {
  var prompt = document.querySelector('#no-idea')
  if (ideasArray.length < 1){
    prompt.classList.remove("hidden");
  } 
  if (ideasArray.length >0) {
    prompt.classList.add("hidden");
  }
}

function toggleStar(e, index) {
   var starImage = e.target;
   var inactive = "images/star.svg";
   var active = "images/star-active.svg";
   if (ideasArray[index].starred === true){
      starImage.src = active;
   } else {
    starImage.src = inactive;
   }
}

function saveStar(e) {
  if (e.target.className === 'star-image') {
    var index = getCardId(e);
  ideasArray[index].starred = !ideasArray[index].starred;
  ideasArray[index].saveToStorage();
  toggleStar(e,index);
  };
 };

function getCardId(e) {
  var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
  return ideasArray.findIndex(function(arrayObj){
        return arrayObj.id == parseInt(ideaId);
  });
}