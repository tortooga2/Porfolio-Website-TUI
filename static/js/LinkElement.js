

class LinkElement {
  constructor(text, url, x, y) {
    this.text = text;
    this.url = url;
    this.x = x;
    this.y = y;
    this.backgroundColor = "#232136";

    this.hoverColor = "";
    this.textColor = "";
    this.fontWeight = "none";
    this.fontStyle = "none";
    this.parent = null;



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

  checkHover = () => {
    //if (this.selectable) {

    let offsetx = 0;
    let offsety = 0;
    if (this.parent != null) {
      offsetx = this.parent.x + 1;
      offsety = this.parent.y + 1;
    }
    if (mouseX >= this.x + offsetx && mouseX <= this.x + offsetx + this.text.length && mouseY == this.y + offsety) {
      this.backgroundColor = this.hoverColor;
      this.textColor = '#232136';
      if (mouseDown) {
        window.open(this.url, '_blank')
      }

    }
    else {
      this.textColor = this.hoverColor;
      this.backgroundColor = '#232136'
    }
  }







  render = () => {
    console.log("Rendering this link", this.text)
    this.checkHover()
    //let width_offset = Math.round(this.text.length / 2);

    if (this.parent != null) {
      let y = this.y;
      let x = this.x - 1;
      for (let i = 0; i < this.text.length; i++) {
        x += 1;
        if (x > this.parent.w) {
          x = this.x;
          y += 1;
        }
        this.parent.ds[y][x] = `<span style="background-color : ${this.backgroundColor}; color : ${this.textColor}; font-weight: ${this.fontWeight}; font-style: ${this.fontStyle}">` + this.text[i] + `</span>`
      }

    } else {
      let index = this.x + this.y * width;


      for (let i = 0; i < this.text.length; i++) {
        if (index > 0 && index + i < height * width) {
          display_surface[index + i] = `<span style="background-color : ${this.backgroundColor}; color : ${this.textColor}">` + this.text[i] + `</span>`;
        }
      }
    }

  }


}
