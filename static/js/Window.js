






class Window {
  constructor(w, h, x, y) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.ds = [];
    for (let i = 0; i < h; i++) {
      let temp = new Array(w);
      for (let j = 0; j < w; j++) {
        temp[j] = " ";
      }
      this.ds.push(temp);
    }
  }
  addText(str, location) {

  }


  drawWindow() {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        let global_index = (this.x + j) + (this.y + i) * width;
        display_surface[global_index] = this.ds[i][j];
      }
    }
  }

  //end of class
}


