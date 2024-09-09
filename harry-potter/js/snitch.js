class Snitch {
    constructor(gameBox) {
      this.gameBox = gameBox;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.element = document.createElement("img");
  
      this.element.src = "./img/snitch.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      this.gameBox.appendChild(this.element);
      console.log(this.element)
    }
  
    updatePosition() {
      // Update the obstacle's position based on the properties left and top
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      this.top += 3;
      this.updatePosition();
      }
    }
      
  
  