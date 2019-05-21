class Idea {
  constructor(id, title, body) {
    this.id = id; 
    this.title = title;
    this.body = body;
  }

  saveToLocalStorage() {
    var stringifiedIdea = JSON.stringify(this);
    localStorage.setItem(this.id, stringifiedIdea);
    
  }
}