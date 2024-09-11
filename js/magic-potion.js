class MagicPotion {
    constructor(gameBox, left, top, width, height, img) {
      this.gameBox = gameBox;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.element = document.createElement("img");
  
      this.element.src = img;
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameBox.appendChild(this.element);
    
    }
  
    updatePosition() {
      
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      this.top += 4;
      this.updatePosition();
      }
    }
      