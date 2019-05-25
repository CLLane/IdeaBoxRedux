class Idea {
  constructor(id, title, body, starred) {
    this.id = id; 
    this.title = title;
    this.body = body;
    this.starred = starred || false;
  }

  saveToStorage() {
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
  }

  deleteFromStorage(index){
   ideasArray.splice(index, 1);
   console.log(ideasArray);
   this.saveToStorage();
  }

  updateQuality() {

  }
}