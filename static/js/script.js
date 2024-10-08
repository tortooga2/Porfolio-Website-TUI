const showHere = document.getElementById("screen");

let nWidth = window.innerWidth;
let nHeight = window.innerHeight;

fontSize = { x: 8, y: 16 };

let height = Math.round(nHeight / fontSize.y) - 1;
let width = Math.round(nWidth / fontSize.x) - 1;

let time = 0;

let scrollAmount = 0;
let scrollDeta = 0;

let mouseX,
  mouseY = 0;
let mouseDown = false;

let click_x = 0;
let click_y = 0;

const lum_map = " .:-=+*#%@";

const noise_map = " .,|/)(#";

let display_surface = [];

let scrollVelocity = 0;

Colors = {
  muted: "#6e6a86",
  overlay: "#393552",
  text: "#e0def4",

  background_color: "#232136",

  rose: "#ea9a97",
  love: "#eb6f92",
  gold: "#f6c177",
  foam: "#9ccfd8",
};

let isMobile = false;

const test = document.createElement("pre");

showHere.appendChild(test);

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

isMobile = window.mobileCheck();

const elements = [];

const setChar = (char, x, y) => {
  display_surface[y][x] = char;
};

const addElement = (element) => {
  elements.push(element);
};

function lumToChar(lum, map) {
  lum = Math.max(Math.min(lum, 1.0), 0.0);
  let lum_map_ratio = map.length;
  let index = Math.floor(lum * lum_map_ratio);
  return map[index];
}

const clearDisplaySurface = (width, height) => {
  display_surface = [];
  for (let i = 0; i < height; i++) {
    let temp = new Array(width);
    for (let j = 0; j < width; j++) {
      temp[j] = " ";
    }
    display_surface.push(temp);
  }
};

const assembleFrame = (display_surface) => {
  let frame = [];
  for (let i = 0; i < height; i++) {
    let temp = display_surface[i].join("");
    frame.push(temp);
  }
  return frame.join("\n");
};

//Sun Rise/Set
//
//const fragmentFunction2 = (x, y) => {
//  let x1 = x / width;
//  let y1 = y / height;
//  return lumToChar(x1 * y1 * Math.abs(Math.cos(time)))
//}

function drawLine(str, x, y, style) {
  for (let i = 0; i < str.length; i++) {
    if (x + i >= 0 && x + i < width && y >= 0 && y < height) {
      display_surface[y][x + i] =
        `<span style="${style}">` + str[i] + `</span>`;
      //display_surface[index + i] = str[i];
    }
  }
}

let fragmentFunction = (x, y) => {
  let n = noise.simplex3(x / 50, y / 50, (time / 10) * 3);
  //let n2 = noise.simplex2(x, y);

  // if (n2 > 0.75) {
  //   return `<span style="color : ${Colors.overlay}">*</span>`;
  // }
  if (n < -0.5) {
    return " ";
  }
  if (n < 0.0) {
    //return `<span style="color : #9ccfd8">$</span>`;
    return "$";
  } else {
    return lumToChar(n, noise_map);
  }
};

const drawBackground = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      setChar(fragmentFunction(x, y), x, y);
    }
  }
};

let render = () => {
  //elements.forEach((i) => { i.render(); })
};

let frameTimes = [];
let lastFrameTime = performance.now();

const drawScreen = () => {
  const now = performance.now();
  const delta = now - lastFrameTime;
  lastFrameTime = now;

  frameTimes.push(delta);

  // Keep only the last 100 frame times
  if (frameTimes.length > 100) {
    frameTimes.shift();
  }

  // Calculate average frame time
  const averageTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
  const fps = Math.round(1000 / averageTime);

  clearDisplaySurface(width, height);
  drawBackground();
  //elements.forEach((i) => { i.render(); })
  render();
  drawLine(`FPS: ${fps}`, 10, 10, `color: ${Colors.gold}`);

  test.innerHTML = assembleFrame(display_surface);
};

const draw = () => {
  drawScreen();

  time += 0.001;
  mouseDown = null;
  requestAnimationFrame(draw);
};

addEventListener("resize", () => {
  nWidth = window.innerWidth;
  nHeight = window.innerHeight;
  let delta_x = width;
  let delta_y = height;

  height = Math.round(nHeight / 16) - 1;
  width = Math.round(nWidth / 8) - 1;
  delta_x -= width;
  delta_y -= height;
  if (width > 95) {
    isMobile = false;
  } else {
    isMobile = true;
  }
  elements.forEach((i) => {
    i.resize(width, height, delta_x, delta_y);
  });
  drawScreen();
});

addEventListener("mousemove", (event) => {
  mouseX = Math.floor((event.clientX - 8 / 2) / 8);
  mouseY = Math.floor((event.clientY - 16 / 2) / 16);
});

addEventListener("mousedown", (event) => {
  mouseDown = true;
});
addEventListener("mouseup", (event) => {
  mouseDown = false;
});

addEventListener("wheel", (event) => {
  scrollAmount += event.deltaY * 0.007;
  scrollDeta = Math.abs(event.deltaY);
});

addEventListener("orientationchange", (event) => {
  nWidth = window.innerWidth;
  nHeight = window.innerHeight;
  let delta_x = width;
  let delta_y = height;

  height = Math.round(nHeight / 16) - 1;
  width = Math.round(nWidth / 8) - 1;
  delta_x -= width;
  delta_y -= height;
  if (width > 95) {
    isMobile = false;
  } else {
    isMobile = true;
  }
  elements.forEach((i) => {
    i.resize(width, height, delta_x, delta_y);
  });
  drawScreen();
});

// listen to "scroll" event

clearDisplaySurface(5, 5);
requestAnimationFrame(draw);
