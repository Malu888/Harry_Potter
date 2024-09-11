class Harry {
    constructor(gameBox, left, top, width, height, img) {
        this.gameBox = gameBox;
        this.left = left;
        this.top = top,
            this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement('img');
        this.element.src = img;
        this.element.style.position = 'absolute';

        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.gameBox.appendChild(this.element);
    }
    move() {
        
        this.left += this.directionX * 6;  //movimento horizontal
        this.top += this.directionY * 6;  //movimento vertical
    
        
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }
    
      // iniciar e parar o movimento
      setDirection(x, y) {
        this.directionX = x;
        this.directionY = y;
      }

      didCollide (other) {
       const harryRect = this.element.getBoundingClientRect();
       const otherRect = other.element.getBoundingClientRect();

       if (
        harryRect.left < otherRect.right &&
        harryRect.right > otherRect.left &&
        harryRect.top < otherRect.bottom &&
        harryRect.bottom > otherRect.top
      ) {
        return true;
      } else {
        return false;
      }
      }
  }