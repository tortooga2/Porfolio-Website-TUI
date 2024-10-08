class ParagraphWindow {
  constructor(w, h, x, y, text) {
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

    this.borderStyle = "none";
    this.borderColor = "none";

    this.text = text;
    this.textLines = []; // Store processed lines here
    this.lines_scrolled = 0;

    this.textColor = Colors.text;

    this.focused = false;
    this.is_scrollable = false;

    for (let i = 0; i < this.h; i++) {
      let temp = new Array(this.w);
      for (let j = 0; j < this.w; j++) {
        temp[j] = " ";
      }
      this.ds.push(temp);
    }

    this.canScrollDown = false; // Will be set after processing text
    this.canScrollUp = false; // Updated during scrolling

    // Process the text into lines upon initialization
    this.processText();

    addEventListener("wheel", (e) => {
      if (this.focused) {
        if (e.deltaY > 0) {
          // Scroll down
          if (this.lines_scrolled < this.textLines.length - (this.h - 2)) {
            this.lines_scrolled++;
            this.canScrollUp = true;
          } else {
            this.canScrollDown = false;
          }
        } else {
          // Scroll up
          if (this.lines_scrolled > 0) {
            this.lines_scrolled--;
            this.canScrollDown = true;
          } else {
            this.canScrollUp = false;
          }
        }
      }
    });
  }

  elements = [];

  addElement = (element) => {
    element.setParent(this);
    this.elements.push(element);
  };

  setParent = (element) => {
    this.parent = element;
  };

  setDisplaySurface = (x, y, char) => {
    this.ds[y][x] = char;
  };

  setBorderStyle = (style) => {
    this.borderStyle = style;
  };

  setBorderColor = (string) => {
    this.borderColor = string;
  };

  drawBorder = () => {
    let horizontal = "";
    let vertical = "";
    let tl_corner = "";
    let tr_corner = "";
    let bl_corner = "";
    let br_corner = "";
    if (this.borderStyle === "none") {
      return;
    }

    if (this.borderStyle === "single") {
      horizontal = "─";
      vertical = "│";
      tl_corner = "┌";
      tr_corner = "┐";
      bl_corner = "└";
      br_corner = "┘";
    } else if (this.borderStyle === "double") {
      horizontal = "═";
      vertical = "║";
      tl_corner = "╔";
      tr_corner = "╗";
      bl_corner = "╚";
      br_corner = "╝";
    } else if (this.borderStyle === "round") {
      horizontal = "─";
      vertical = "│";
      tl_corner = "╭";
      tr_corner = "╮";
      bl_corner = "╰";
      br_corner = "╯";
    }

    // Top border
    this.ds[0][0] =
      `<span style="color : ${this.borderColor}">` + tl_corner + `</span>`;
    this.ds[0][this.w - 1] =
      `<span style="color : ${this.borderColor}">` + tr_corner + `</span>`;
    for (let i = 1; i < this.w - 1; i++) {
      this.ds[0][i] =
        `<span style="color : ${this.borderColor}">` + horizontal + `</span>`;
    }

    // Bottom border
    this.ds[this.h - 1][0] =
      `<span style="color : ${this.borderColor}">` + bl_corner + `</span>`;
    this.ds[this.h - 1][this.w - 1] =
      `<span style="color : ${this.borderColor}">` + br_corner + `</span>`;
    for (let i = 1; i < this.w - 1; i++) {
      this.ds[this.h - 1][i] =
        `<span style="color : ${this.borderColor}">` + horizontal + `</span>`;
    }

    // Side borders
    for (let i = 1; i < this.h - 1; i++) {
      this.ds[i][0] =
        `<span style="color : ${this.borderColor}">` + vertical + `</span>`;
      this.ds[i][this.w - 1] =
        `<span style="color : ${this.borderColor}">` + vertical + `</span>`;
    }
  };

  getGlobalPos = () => {
    let x = this.x;
    let y = this.y;
    if (this.parent != null) {
      let parentPos = this.parent.getGlobalPos();
      x += parentPos.x;
      y += parentPos.y;
    }
    return { x, y };
  };

  onHover() {
    let { x, y } = this.getGlobalPos();

    if (
      mouseX >= x &&
      mouseX <= x + this.w &&
      mouseY >= y &&
      mouseY <= y + this.h
    ) {
      this.focused = true;
    } else {
      this.focused = false;
    }
  }

  padding = 1;

  resize = (width, height, x_delta, y_delta) => {
    this.w -= x_delta;
    this.h -= y_delta;

    if (this.w > this.max_w || this.x + this.w < width - this.padding)
      this.w = this.max_w;
    if (this.h > this.max_h || this.y + this.h < height - this.padding)
      this.h = this.max_h;

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
    this.elements.forEach((i) => {
      i.resize(this.w, this.h, x_delta, y_delta);
    });

    // Re-process text after resizing
    this.processText();
  };

  clear_ds = () => {
    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        this.ds[i][j] = " ";
      }
    }
  };

  wrap_bound = 4;

  /**
   * Process the text into lines with word wrapping
   */
  processText = () => {
    this.textLines = []; // Reset text lines array

    let words = this.text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      let word = words[i];

      // Handle newlines within words
      let parts = word.split("\n");
      for (let j = 0; j < parts.length; j++) {
        let part = parts[j];
        if (line.length + part.length + 1 <= this.w - 2) {
          if (line.length > 0) {
            line += " " + part;
          } else {
            line = part;
          }
        } else {
          // Line is full, push to textLines
          this.textLines.push(line);
          line = part;
        }

        // If there was a newline character, start a new line
        if (j < parts.length - 1) {
          this.textLines.push(line);
          line = "";
        }
      }
    }

    // Push any remaining text in the line
    if (line.length > 0) {
      this.textLines.push(line);
    }

    // Update scrolling capability
    if (this.textLines.length > this.h - 2) {
      this.canScrollDown = true;
    } else {
      this.canScrollDown = false;
    }
  };

  renderText = () => {
    // Determine the range of lines to render based on scrolling
    let startLine = this.lines_scrolled;
    let endLine = startLine + this.h - 2; // Subtract borders

    if (endLine > this.textLines.length) {
      endLine = this.textLines.length;
    }

    // Render each line into the display surface
    for (let i = startLine, dsRow = 1; i < endLine; i++, dsRow++) {
      let line = this.textLines[i];
      for (let j = 0; j < line.length && j < this.w - 2; j++) {
        let character = "";
        if (j === 0) {
          character = `<span style="color: ${this.textColor}">` + line[j];
        } else if (j === line.length - 1) {
          character = line[j] + `</span>`;
        } else {
          character = line[j];
        }
        this.ds[dsRow][j + 1] = character;
      }
    }
  };

  render = () => {
    this.clear_ds();
    this.drawBorder();
    this.onHover();

    this.renderText();

    let { x, y } = this.getGlobalPos();

    for (let i = 0; i < this.h; i++) {
      for (let j = 0; j < this.w; j++) {
        display_surface[y + i][x + j] = this.ds[i][j];
      }
    }
  };
}
