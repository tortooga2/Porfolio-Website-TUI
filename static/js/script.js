const showHere = document.getElementById("screen")


let nWidth = window.innerWidth;
let nHeight = window.innerHeight;

let height = Math.round(nHeight / 15) - 1;
let width = Math.round(nWidth / 7.828) - 1;

let time = 0;

let scrollAmount = 0;
let scrollDeta = 0;

let mouseX, mouseY = 0;
let mouseDown = false;

const lum_map = " .:-=+*#%@";

const noise_map = " .,|/)(#"

let display_surface = [];


let scrollVelocity = 0;


const rose = '#ea9a97'
const love = '#eb6f92'
const gold = '#f6c177'
const foam = '#9ccfd8'


let title = [];

const mobile_title = [`Chase Nagle...`];

const title_desktop = [
  ` ██████╗██╗  ██╗ █████╗ ███████╗███████╗    ███╗   ██╗ █████╗  ██████╗ ██╗     ███████╗`,
  `██╔════╝██║  ██║██╔══██╗██╔════╝██╔════╝    ████╗  ██║██╔══██╗██╔════╝ ██║     ██╔════╝`,
  `██║     ███████║███████║███████╗█████╗      ██╔██╗ ██║███████║██║  ███╗██║     █████╗  `,
  `██║     ██╔══██║██╔══██║╚════██║██╔══╝      ██║╚██╗██║██╔══██║██║   ██║██║     ██╔══╝  `,
  `╚██████╗██║  ██║██║  ██║███████║███████╗    ██║ ╚████║██║  ██║╚██████╔╝███████╗███████╗`,
  ` ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝`,
]



const test = document.createElement("pre");

showHere.appendChild(test);


addEventListener("wheel", (event) => {
  scrollAmount += event.deltaY * 0.007;
  scrollDeta = Math.abs(event.deltaY);
})

if (width > title_desktop[0].length) {
  title = title_desktop;
}
else {
  title = mobile_title;
}

const elements = [];




const addElement = (element) => {
  elements.push(element);
}


function lumToChar(lum, map) {

  lum = Math.max(Math.min(lum, 1.0), 0.0)
  let lum_map_ratio = map.length;
  let index = Math.floor(lum * lum_map_ratio);
  return map[index];
}






//Sun Rise/Set
//
//const fragmentFunction2 = (x, y) => {
//  let x1 = x / width;
//  let y1 = y / height;
//  return lumToChar(x1 * y1 * Math.abs(Math.cos(time)))
//}

function drawLine(str, x, y, style) {

  let width_offset = Math.round(str.length / 2);
  let index = x + y * width;

  for (let i = 0; i < str.length; i++) {
    if (index > 0 && index + i < height * width) {
      display_surface[index + i] = `<span style="${style}">` + str[i] + `</span>`;
      //display_surface[index + i] = str[i];
    }
  }
}



let fragmentFunction = (x, y) => {
  let n = noise.simplex3(x / 50, y / 50, time / 10 * 3);
  let n2 = noise.simplex2(x, y);

  if (n2 > 0.75) {
    return `<span style="color : #393552">*</span>`;
  }
  if (n < -0.5) {
    return " "
  }
  if (n < 0.0) {
    //return `<span style="color : #9ccfd8">$</span>`;
    return "$"
  }
  else {
    return lumToChar(n, noise_map)
  }
}

const drawBackground = () => {
  let index = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      index = x + y * width;
      display_surface[index] = fragmentFunction(x, y);
    }

    display_surface[index] = "\n";

  }
}


let render = () => {
  //elements.forEach((i) => { i.render(); })

}



const drawScreen = () => {
  display_surface = [];
  drawBackground();
  for (let i = 0; i < title.length; i++) {
    drawLine(title[i], 5, 3 + i, `color: ${gold}; background-color: #232136`);
  }
  drawLine("Work in progress! Come back later. ", 8, 10,
    `color : ${love}; font-weight: bold; font-style: italic`);
  //elements.forEach((i) => { i.render(); })
  render();

  test.innerHTML = display_surface.join('');
}




const draw = () => {
  drawScreen();
  time += 0.001;
  requestAnimationFrame(draw);
}


addEventListener("resize", () => {
  nWidth = window.innerWidth;
  nHeight = window.innerHeight;
  let delta_x = width;
  let delta_y = height;

  height = Math.round(nHeight / 15) - 1;
  width = Math.round(nWidth / 7.828) - 1;
  delta_x -= width;
  delta_y -= height;
  if (width < title_desktop[0].length + 20) {
    title = mobile_title;
  }
  else {
    title = title_desktop;
  }
  elements.forEach((i) => { i.resize(width, height, delta_x, delta_y); })
  drawScreen();
})

addEventListener("mousemove", (event) => {
  mouseX = Math.floor((event.clientX - (7.828 / 2)) / 7.828);
  mouseY = Math.floor((event.clientY - (15 / 2)) / 15);

})

addEventListener("mousedown", (event) => {
  mouseDown = true;
})

addEventListener("mouseup", (event) => {
  mouseDown = false;
})

// listen to "scroll" event


requestAnimationFrame(draw)

