class Idea {
  constructor(id, title, body) {
    this.id = id; 
    this.title = title;
    this.body = body;
  }

  saveToStorage() {
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
  }

  deleteFromStorage(){
    
  }

  // updateIdea(body or title) {

  // }

  updateQuality() {

  }
}