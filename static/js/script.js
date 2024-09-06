
const showHere = document.getElementById("screen")

//showHere.style.whiteSpace = "break-spaces"

let nWidth = window.innerWidth;
let nHeight = window.innerHeight;

let width = Math.round(nHeight / 15) - 0;
let height = Math.round(nWidth / 7.828) - 1;

let time = 0;

let scrollAmount = 0;
let scrollDeta = 0;

const lum_map = " .:-=+*#%@";
const lum_map_ratio = lum_map.length;

let display_surface = "";


let scrollVelocity = 0;




const test = document.createElement("pre");

showHere.appendChild(test);


addEventListener("wheel", (event) => {
  scrollAmount += event.deltaY * 0.007;
  scrollDeta = Math.abs(event.deltaY);
})



function lumToChar(lum) {

  lum = Math.max(Math.min(lum, 1.0), 0.0)
  let index = Math.floor(lum * lum_map_ratio);
  return lum_map[index];
}

//Sun Rise/Set
//
//function fragmentFunction(x, y) {
//  let x1 = x / width;
//  let y1 = y / height;
//  return lumToChar(x1 * y1 * Math.abs(Math.cos(time)))
//}

function fragmentFunction(x, y) {
  let yVal = 5 * Math.cos(x * (0.3 * Math.abs(Math.cos(time * 0.1))) + time * 16.0 + scrollAmount) + 70 * Math.sin(x * 0.01 + scrollAmount * 0.01) + (height / 2);
  scrollDeta = 0;
  let lum = Math.abs(yVal - y);
  lum /= height;
  return lumToChar(lum);
};



const drawBackground = () => {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      display_surface += fragmentFunction(i, j)
    }
    if (i < width - 1) {
      display_surface += "\n";
    }
  }

}



const drawScreen = () => {
  display_surface = "";
  drawBackground();
  test.innerText = display_surface;
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
  width = Math.round(nHeight / 15) - 1;
  height = Math.round(nWidth / 7.828) - 1;
  drawScreen();
  console.log(width, height);
})

// listen to "scroll" event



requestAnimationFrame(draw)

