var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var cardSection = document.querySelector('#card-section')
var ideasArray = [];

saveButton.addEventListener('click', saveFunction)

function saveFunction(e) {
  e.preventDefault();
  var newIdeaInstance = new Idea(Date.now(), titleInput.value, bodyInput.value);
  newIdeaInstance.saveToStorage();
  ideasArray.push(newIdeaInstance);
  generateCard(newIdeaInstance);
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
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

instantiateIdeas();


//Disable Save Button unless all the inputs are filled///
titleInput.addEventListener('keyup', enableSaveButton)
bodyInput.addEventListener('keyup', enableSaveButton)

function enableSaveButton() {
titleInput.value === '' || bodyInput.value === '' ? saveButton.disabled = true: saveButton.disabled = false;  
}



//Populating Cards//

//QuerySelect the card table



function abraCadabra(){

for (var i = 0; i < ideasArray.length; i++) {

var ideaCard =  `<article class="idea-card" data-id="${ideasArray[i].id}"> 
          <div class="card-top" >
          <button class="star-button"><img src="images/star.svg"></button>
          <button class="delete-button"><img src="images/delete.svg" class="delete-button"></button>
        </div>
        <h3>${ideasArray[i].title}</h3>
        <p class="idea-body">${ideasArray[i].body}</p>
        <div class="card-bottom">
          <button class="upvote-button"><img src="images/upvote.svg" class="upvote-svg"></button>
          <p class="quality-label">Quality:<span>Swill</span></p>
          <button class="downvote-button"><img src="images/downvote.svg"></button>
        </div>
        </article>`

        cardSection.insertAdjacentHTML('afterbegin', ideaCard);

  }
}

function generateCard(newIdeaObject) {
  var ideaCard =  `<article class="idea-card" data-id="${newIdeaObject.id}"> 
          <div class="card-top" >
          <button class="star-button"><img src="images/star.svg"></button>
          <button class="delete-button"><img src="images/delete.svg" class="delete-button"></button>
        </div>
        <h3>${newIdeaObject.title}</h3>
        <p class="idea-body">${newIdeaObject.body}</p>
        <div class="card-bottom">
          <button class="upvote-button"><img src="images/upvote.svg" class="upvote-svg"></button>
          <p class="quality-label">Quality:<span>Swill</span></p>
          <button class="downvote-button"><img src="images/downvote.svg"></button>
        </div>
        </article>`

        cardSection.insertAdjacentHTML('afterbegin', ideaCard);

}


abraCadabra()



//delet card from dom///
cardSection.addEventListener('click', deleteCard)

function deleteCard(e){
  if (e.target.className === 'delete-button'){
    e.target.closest('.idea-card').remove();
    var ideaId = e.target.closest('.idea-card').getAttribute('data-id');
    var updatedAray = ideasArray.filter(function(arrayObj){
      if( arrayObj.id !== parseInt(ideaId)) {
        return arrayObj
      }
    })
    ideasArray = updatedAray;
    localStorage.setItem('ideas array', JSON.stringify(ideasArray));
    console.log(updatedAray)
    };
 };














