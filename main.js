var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var cardSection = document.querySelector('#card-section');
var searchBar = document.querySelector('#search-input');
var filterStarredButton = document.querySelector('.filter-starred-button');
var filterSwillButton = document.querySelector('#swill-filter');
var filterPlausibleButton = document.querySelector('#plausible-filter');
var filterGeniusButton = document.querySelector('#genius-filter');
var prompt = document.querySelector('#no-idea')
var ideasArray = [];
var prompt = document.querySelector('#no-idea');
var body = document.querySelector('body');
var aside = document.querySelector('aside');
var navTitle = document.querySelector('.desktop-nav-title');
var showMoreButton = document.querySelector('.show-more-button');
var hamburgerButton = document.querySelector('.hamburger-button');

titleInput.addEventListener('keyup', enableSaveButton);
bodyInput.addEventListener('keyup', enableSaveButton);
searchBar.addEventListener('keyup', searchFunction);
cardSection.addEventListener('keydown', listenForEnter);
cardSection.addEventListener('focusout', updateCard);
cardSection.addEventListener('click', cardSectionHandler);
saveButton.addEventListener('click', saveButtonHandler);
filterStarredButton.addEventListener('click', toggleFilterStarred);
filterSwillButton.addEventListener('click', toggleFilterQuality);
filterPlausibleButton.addEventListener('click', toggleFilterQuality);
filterGeniusButton.addEventListener('click', toggleFilterQuality);
showMoreButton.addEventListener('click', showMoreButtonToggle)
window.addEventListener('load', pageLoadHandler);

hamburgerButton.addEventListener('click', toggleMobileMenu)

function showMoreButtonToggle() {
  showMoreButton.clicked = !showMoreButton.clicked;
  cardSection.innerHTML = '';
  if (showMoreButton.clicked === true) {
    showMoreButton.innerText = 'Show Less';
    populateCards(ideasArray);
  } else {
    pageLoadCardPopulation();
    showMoreButton.innerText = 'Show More';
  }
}

function toggleMobileMenu(e) {
    hamburgerButton.clicked = !hamburgerButton.clicked
    changeMobileMenuIcon(hamburgerButton);
    if (hamburgerButton.clicked === true) {
      aside.classList.add('unhidden');
      navTitle.classList.add('hidden');
    } else {aside.classList.remove('unhidden');
      navTitle.classList.remove('hidden')
    }
  }

function changeMobileMenuIcon (button) {
  if (button.clicked === true) {
      var mobileMenu = document.querySelector('.mobile-nav')
      button.src = 'images/menu-close.svg';
    }
    if (button.clicked === false) {
      button.src = 'images/menu.svg';
    }
}

function pageLoadHandler() {
  instantiateIdeas();
  pageLoadCardPopulation();
  noIdeasPrompt();
}

function pageLoadCardPopulation() {
  for (var i = 0; i < 10; i++) {
    generateCard(ideasArray[i]);
  }
}

function showMoreCards() {
  for (var i = 10; i < ideasArray.length; i++) {
    generateCard(ideasArray[i])
  }
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

function searchFunction(arrayName) {
   if (filterStarredButton.clicked === true){
    starredSearch();
   } else {
  var searchInput = searchBar.value
     cardSection.innerHTML = '';
    var newArray = ideasArray.filter(function(arrayObject){
  return arrayObject.title.includes(searchInput) || arrayObject.body.includes(searchInput)
  })
  populateCards(newArray);
}
  }
  
  function starredSearch () {
    var starredArray = starredFilterArray();
    var searchInput = searchBar.value
    cardSection.innerHTML = '';
    var newArray = starredArray.filter(function(arrayObject){
      return arrayObject.title.includes(searchInput) || arrayObject.body.includes(searchInput)
    })
    populateCards(newArray);
  }

  function filterStarred(){
  if (filterStarredButton.clicked === true) {
    cardSection.innerHTML = '';
    var starred = starredFilterArray();
    populateCards(starred);
    // return starred;
    } 
  return ideasArray;
}

function starredFilterArray() {
  var filterArray = ideasArray.filter(function(arrayObject){
    return arrayObject.starred === true
  })
    return filterArray
}

function toggleFilterStarred() {
  filterStarredButton.clicked = !filterStarredButton.clicked;
  if (filterStarredButton.clicked === true) {
    filterStarredButton.innerText = 'Show All Cards'
  } 
  if (filterStarredButton.clicked === false){
    cardSection.innerHTML = '';
    filterStarredButton.innerText = 'Show Starred Ideas';
    populateCards(ideasArray);
  }
  filterStarred();
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
   noIdeasPrompt();
  };


function noIdeasPrompt() {
  
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



//filter swill//

function filterQuality(quality) {

  cardSection.innerHTML = '';
  populateCards(quality);

return ideasArray;
}

function filterQualityArray(num) {
  var filterArray = ideasArray.filter(function(arrayObject){
    return arrayObject.quality === num;
  })
    return filterArray
}

function toggleFilterQuality(e) {
   e.target.clicked = !e.target.clicked;
  filterQualityButton(e, 'Swill', 0);
  filterQualityButton(e, 'Plausible', 1);
  filterQualityButton(e, 'Genius', 2);
  filterNone(e);
}

function filterQualityButton(e, type, index) {
  if (e.target.clicked === true && e.target.innerText === type) {
    var array = filterQualityArray(index);
    filterQuality(array);
}
}

function filterNone(e) {
  if (e.target.clicked === false) {
    cardSection.innerHTML = '';
    populateCards(ideasArray)
  }
}
