class Idea {
  constructor(id, title, body) {
    this.id = id; 
    this.title = title;
    this.body = body;
  }

  saveToStorage(updatedArray) {
    localStorage.setItem(this.id, JSON.stringify(this));

  }

  deleteFromStorage(index){
    ideasArray.splice(index, 1);
    this.saveToStorage();
  }

  updateIdea() {

  }

  updateQuality() {

  }
}