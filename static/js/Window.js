






class Window {
  constructor(w, h, x, y) {

    this.parent = null;

    this.max_w = w;
    this.max_h = h;

    this.w = w;
    this.h = h;


    if (x + w > width - 1) {
      this.w = width - x - 1;
    }
    if (y + h > height - 1) {
      this.h = height - y - 1;
    }



    this.x = x;
    this.y = y;
    this.ds = [];
    this.borderStyle = "single"

    this.fragmentFunction = (x, y) => { return " "; };

    for (let i = 0; i < this.h; i++) {
      let temp = new Array(this.w);
      for (let j = 0; j < this.w; j++) {
        temp[j] = " ";
      }
      this.ds.push(temp);
    }


  }

  elements = [];


  addElement = (element) => {
    element.setParent(this);
    this.elements.push(element);

  }

  setParent = (element) => {
    this.parent = element;
  }

  setDisplaySurface = (x, y, char) => {
    this.ds[y][x] = char;
  }


  //TODO: NEED TO FIX THIS. WHEN A USER GOES ONTO THE SITE THE WINDOWS DO NOT AUTOMATICALLY RESIZE




  setBorderStyle = (style) => {
    this.borderStyle = style;
  }

  setFragFunc = (fragFunc) => {
    this.fragmentFunction = fragFunc;
  }



  drawBackground = () => {
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        this.ds[y][x] = this.fragmentFunction(x, y);
      }
    }
  }


  drawBorder = () => {
    let horizontal = "";
    let vertical = "";
    let tl_corner = "";
    let tr_corner = "";
    let bl_corner = "";
    let br_corner = "";
    if (this.borderStyle === 'none') {
      return;
    }

    if (this.borderStyle === 'single') {
      horizontal = "─";
      vertical = "│";
      tl_corner = "┌";
      tr_corner = "┐";
      bl_corner = "└";
      br_corner = "┘";

    }
    else if (this.borderStyle === 'double') {
      horizontal = "═";
      vertical = "║";
      tl_corner = "╔";
      tr_corner = "╗";
      bl_corner = "╚";
      br_corner = "╝";
    }
    else if (this.borderStyle === "round") {
      horizontal = "─";
      vertical = "│";
      tl_corner = "╭";
      tr_corner = "╮";
      bl_corner = "╰";
      br_corner = "╯";
    }

    // Top border
    this.ds[0][0] = tl_corner;
    this.ds[0][this.w - 1] = tr_corner;
    for (let i = 1; i < this.w - 1; i++) {
      this.ds[0][i] = horizontal;
    }

    // Bottom border
    this.ds[this.h - 1][0] = bl_corner;
    this.ds[this.h - 1][this.w - 1] = br_corner;
    for (let i = 1; i < this.w - 1; i++) {
      this.ds[this.h - 1][i] = horizontal;
    }

    // Side borders
    for (let i = 1; i < this.h - 1; i++) {
      this.ds[i][0] = vertical;
      this.ds[i][this.w - 1] = vertical;
    }
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

  onHover() {
    //if (this.selectable) {
    //
    let { x, y } = this.getGlobalPos();

    if (mouseX >= x && mouseX <= x + this.w && mouseY >= y && mouseY <= y + this.h) {
      this.fragmentFunction = fragmentFunction;

    }
    else {
      this.fragmentFunction = (x, y) => { return " " };
    }
    //}

  }

  //TODO: Resizing causes the whole ascii thing to break. Something about it not looping. I am not sure why is does it yet.
  //But we should work on resizing stuff. A possible solution could be letting each window have its own resize event.
  //
  //
  padding = 1;




  resize = (width, height, x_delta, y_delta) => {
    this.w -= x_delta;
    this.h -= y_delta;

    if (this.w > this.max_w || this.x + this.w < width - this.padding) this.w = this.max_w;
    if (this.h > this.max_h || this.y + this.h < height - this.padding) this.h = this.max_h;

    // Clear and rebuild ds based on new width and height
    if (this.w < 0 || this.h < 0) return;
    this.ds = [];
    for (let i = 0; i < this.h; i++) {
      let temp = new Array(this.w);
      for (let j = 0; j < this.w; j++) {
        temp[j] = " ";
      }
      this.ds.push(temp);
    }
    this.elements.forEach((i) => { i.resize(this.w, this.h, x_delta, y_delta) })
  }

  render = () => {
    this.drawBackground();
    this.drawBorder();
    this.onHover();

    let { x, y } = this.getGlobalPos();


    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        display_surface[y + i][x + j] = this.ds[i][j];
      }
    }


  }



  //end of class
}


