




class Art {
  constructor(ascii_art, x, y) {
    this.ascii_art = ascii_art;
    this.x = x;
    this.y = y;
    this.w = this.findWidthOfArt(ascii_art);
    this.h = ascii_art.length;

    console.log(this.ascii_art)
  }

  color = "none";
  background_color = "none";

  parent = null;

  setParent = (parent) => {
    this.parent = parent;
  }

  setArt = (ascii_art) => {
    this.ascii_art = ascii_art;
    this.w = this.findWidthOfArt(ascii_art);
    this.h = ascii_art.length;
  }

  setColor = (color) => {
    this.color = color;
  }

  setBackgroundColor = (background_color) => {
    this.background_color = background_color;
  }

  findWidthOfArt = (ascii_art) => {
    let max_width = 0;
    for (let i = 0; i < ascii_art.length; i++) {
      if (max_width < ascii_art[i].length) {
        console.log(max_width)
        max_width = ascii_art[i].length;
      }
    }
    return max_width;
  }


  getGlobalPos = () => {
    let x = this.x;
    let y = this.y;
    if (this.parent != null) {
      let parentPos = this.parent.getGlobalPos();
      x += parentPos.x;
      y += parentPos.y;
    }
    return { x, y };
  }

  resize = (width, height, delta_x, delta_y) => {

  }

  render = () => {
    let { x, y } = this.getGlobalPos();


    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.ascii_art[i].length; j++) {

        display_surface[y + i][x + j] = `<span style="color : ${this.color}; background-color : ${this.background_color}; ">` + this.ascii_art[i][j] + '</span>'

      }
    }

  }





}
