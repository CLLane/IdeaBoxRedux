class Idea {
  constructor(id, title, body, starred, quality) {
    this.id = id; 
    this.title = title;
    this.body = body;
    this.starred = starred || false;
    this.qualityArray = ['Swill', 'Plausible', 'Genius'];
    this.quality = quality || 0;
  }

  saveToStorage() {
  localStorage.setItem('ideas array', JSON.stringify(ideasArray));
  }

  deleteFromStorage(index){
   ideasArray.splice(index, 1);
   this.saveToStorage();
  }

  updateIdea(propertyToUpdate, newValue) {
    this[propertyToUpdate] = newValue;
    this.saveToStorage();
  }


  updateQuality(cardIndex, buttonType) {
    if (buttonType === 'upvote' && this.quality < 2){
      this.quality++;
    }
    if (buttonType === 'downvote' && this.quality > 0){
      this.quality--;
    }
    ideasArray[cardIndex].quality = this.quality;
    ideasArray[cardIndex].saveToStorage();

  }
    
}