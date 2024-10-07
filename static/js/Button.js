class ButtonElement {
  constructor(text, x, y, func) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.max_x = x;
    this.max_y = y;
    this.backgroundColor = "#232136";

    this.hoverColor = "";
    this.textColor = "";
    this.fontWeight = "none";
    this.fontStyle = "none";
    this.parent = null;

    this.command = func;
    this.selectable = true;
  }
  setParent(parent) {
    this.parent = parent;
  }
  setColor(color) {
    this.textColor = color;
  }
  setHoverColor(color) {
    this.hoverColor = color;
  }
  setFontWeight(weight) {
    this.fontWeight = weight;
  }

  setSelectable = (state) => {
    this.selectable = state;
  }

  checkHover = () => {
    //if (this.selectable) {
    //
    let { x, y } = this.getGlobalPos();


    if (mouseX >= x && mouseX <= x + this.text.length && mouseY == y) {
      this.backgroundColor = this.hoverColor;
      this.textColor = '#232136';
      if (mouseDown) {
        this.command();
        mouseDown = false;
      }

    }
    else {
      this.textColor = this.hoverColor;
      this.backgroundColor = '#232136'
    }
  }
  //TODO: Must figure out resize rule!
  resize = (width, height, x_delta, y_delta) => {

    //    if (this.x + this.text.length >= width - 1) {
    //      this.x -= (this.x + this.text.length - width);
    //    } else {
    //      this.x = this.max_x
    //    }
    //    if (this.y <= height - 1) {
    //      this.y -= (this.y - width);
    //    } else {
    //      this.y = this.max_y;
    //    }
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

  render = () => {
    this.checkHover()
    //let width_offset = Math.round(this.text.length / 2);

    let { x, y } = this.getGlobalPos();
    for (let i = 0; i < this.text.length; i++) {
      display_surface[y][x + i] = `<span style="background-color : ${this.backgroundColor}; color : ${this.textColor}; font-weight: ${this.fontWeight}; font-style: ${this.fontStyle}">` + this.text[i] + `</span>`
    }



  }


}
