const showHere = document.getElementById("screen")

//showHere.style.whiteSpace = "break-spaces"

let nWidth = window.innerWidth;
let nHeight = window.innerHeight;

let height = Math.round(nHeight / 15) - 1;
let width = Math.round(nWidth / 7.828) - 1;

let time = 0;

let scrollAmount = 0;
let scrollDeta = 0;

let mouseX, mouseY = 0;

const lum_map = " .:-=+*#%@";

const noise_map = " .,|/)(#"

//const lum_map_ratio = lum_map.length;

let display_surface = [];


let scrollVelocity = 0;


const rose = '#ea9a97'
const love = '#eb6f92'
const gold = '#f6c177'
const foam = '#9ccfd8'


//const title = [`    ,o888888o.    8 8888        8          .8.            d888888o.   8 8888888888             b.             8          .8.           ,o888888o.    8 8888         8 8888888888   `,
//  `   8888     \`88.  8 8888        8         .888.         .\`8888:' \`88. 8 8888                   888o.          8         .888.         8888     \`88.  8 8888         8 8888         `,
//  `,8 8888       \`8. 8 8888        8        :88888.        8.\`8888.   Y8 8 8888                   Y88888o.       8        :88888.     ,8 8888       \`8. 8 8888         8 8888         `,
//  `88 8888           8 8888        8       . \`88888.       \`8.\`8888.     8 8888                   .\`Y888888o.    8       . \`88888.    88 8888           8 8888         8 8888         `,
//  `88 8888           8 8888        8      .8. \`88888.       \`8.\`8888.    8 888888888888           8o. \`Y888888o. 8      .8. \`88888.   88 8888           8 8888         8 888888888888 `,
//  `88 8888           8 8888        8     .8\`8. \`88888.       \`8.\`8888.   8 8888                   8\`Y8o. \`Y88888o8     .8\`8. \`88888.  88 8888           8 8888         8 8888         `,
//  `88 8888           8 8888888888888    .8' \`8. \`88888.       \`8.\`8888.  8 8888                   8   \`Y8o. \`Y8888    .8' \`8. \`88888. 88 8888   8888888 8 8888         8 8888         `,
//  `\`8 8888       .8' 8 8888        8   .8'   \`8. \`88888.  8b   \`8.\`8888. 8 8888                   8      \`Y8o. \`Y8   .8'   \`8. \`88888.\`8 8888       .8' 8 8888         8 8888         `,
//  `   8888     ,88'  8 8888        8  .888888888. \`88888. \`8b.  ;8.\`8888 8 8888                   8         \`Y8o.\`  .888888888. \`88888.  8888     ,88'  8 8888         8 8888         `,
//  `    \`8888888P'    8 8888        8 .8'       \`8. \`88888. \`Y8888P ,88P' 8 888888888888           8            \`Yo .8'       \`8. \`88888.  \`8888888P'    8 888888888888 8 888888888888 `]

//const title = [
//  ' ▄▄·  ▄ .▄ ▄▄▄· .▄▄ · ▄▄▄ .     ▐ ▄  ▄▄▄·  ▄▄ • ▄▄▌  ▄▄▄ .',
//  '▐█ ▌▪██▪▐█▐█ ▀█ ▐█ ▀. ▀▄.▀·    •█▌▐█▐█ ▀█ ▐█ ▀ ▪██•  ▀▄.▀·',
//  '██ ▄▄██▀▐█▄█▀▀█ ▄▀▀▀█▄▐▀▀▪▄    ▐█▐▐▌▄█▀▀█ ▄█ ▀█▄██▪  ▐▀▀▪▄',
//  '▐███▌██▌▐▀▐█ ▪▐▌▐█▄▪▐█▐█▄▄▌    ██▐█▌▐█ ▪▐▌▐█▄▪▐█▐█▌▐▌▐█▄▄▌',
//  '·▀▀▀ ▀▀▀ · ▀  ▀  ▀▀▀▀  ▀▀▀     ▀▀ █▪ ▀  ▀ ·▀▀▀▀ .▀▀▀  ▀▀▀ ']

//const title = [
//  `    ___       ___       ___       ___       ___            ___       ___       ___       ___       ___   `,
//  `   /\\  \\     /\\__\\     /\\  \\     /\\  \\     /\\  \\          /\\__\\     /\\  \\     /\\  \\     /\\__\\     /\\  \\  `,
//  `  /::\\  \\   /:/__/_   /::\\  \\   /::\\  \\   /::\\  \\        /:| _|_   /::\\  \\   /::\\  \\   /:/  /    /::\\  \\ `,
//  ` /:/\\:\\__\\ /::\\/\\__\\ /::\\:\\__\\ /\\:\\:\\__\\ /::\\:\\__\\      /::|/\\__\\ /::\\:\\__\\ /:/\\:\\__\\ /:/__/    /::\\:\\__\\`,
//  ` \\:\\ \\/__/ \\/\\::/  / \\/\\::/  / \\:\\:\\/__/ \\:\\:\\/  /      \\/|::/  / \\/\\::/  / \\:\\:\\/__/ \\:\\  \\    \\:\\:\\/  /`,
//  `  \\:\\__\\     /:/  /    /:/  /   \\::/  /   \\:\\/  /         |:/  /    /:/  /   \\::/  /   \\:\\__\\    \\:\\/  / `,
//  `   \\/__/     \\/__/     \\/__/     \\/__/     \\/__/          \\/__/     \\/__/     \\/__/     \\/__/     \\/__/  `,
//]

const title = [
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


const newWindow = new Window(85, 50, 6, 13);
newWindow.setBorderStyle("round");
newWindow.setFragFunc(fragmentFunction);


const secondWindow = new Window(85, 50, 100, 13);
secondWindow.setBorderStyle("double");
secondWindow.setFragFunc(fragmentFunction);





const drawScreen = () => {
  display_surface = [];
  drawBackground();
  for (let i = 0; i < title.length; i++) {
    drawLine(title[i], 5, 3 + i, `color: ${gold}; background-color: #232136`);
  }
  drawLine("Work in progress! Come back later. Or not, I push to main often ;)", 8, 10,
    `color : ${love}; font-weight: bold; font-style: italic`);
  newWindow.drawWindow();
  secondWindow.drawWindow();


  test.innerHTML = display_surface.join('');
}






const draw = () => {
  //console.log("scroll", scrollVelocity);
  drawScreen();
  time += 0.001;
  requestAnimationFrame(draw);
}


addEventListener("resize", () => {
  nWidth = window.innerWidth;
  nHeight = window.innerHeight;
  height = Math.round(nHeight / 15) - 1;
  width = Math.round(nWidth / 7.828) - 1;
  drawScreen();
  console.log(width, height);
})

addEventListener("mousemove", (event) => {
  mouseX = event.clientX / 7.828;
  mouseY = event.clientY / 15;

})

// listen to "scroll" event



requestAnimationFrame(draw)

