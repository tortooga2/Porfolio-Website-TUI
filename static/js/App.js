const title_desktop = [
  ` ██████╗██╗  ██╗ █████╗ ███████╗███████╗    ███╗   ██╗ █████╗  ██████╗ ██╗     ███████╗`,
  `██╔════╝██║  ██║██╔══██╗██╔════╝██╔════╝    ████╗  ██║██╔══██╗██╔════╝ ██║     ██╔════╝`,
  `██║     ███████║███████║███████╗█████╗      ██╔██╗ ██║███████║██║  ███╗██║     █████╗  `,
  `██║     ██╔══██║██╔══██║╚════██║██╔══╝      ██║╚██╗██║██╔══██║██║   ██║██║     ██╔══╝  `,
  `╚██████╗██║  ██║██║  ██║███████║███████╗    ██║ ╚████║██║  ██║╚██████╔╝███████╗███████╗`,
  ` ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝`,
]

const mainWindow = new Window(100, 100, Math.floor(width / 2) - 50, 0);
mainWindow.setBorderStyle("single");
addElement(mainWindow);

const newWindow = new Window(50, 50, 10, 10);
newWindow.setBorderStyle("single");
newWindow.setFragFunc(fragmentFunction);
mainWindow.addElement(newWindow)

const secondWindow = new Window(25, 25, 10, 10);
secondWindow.setBorderStyle("double");
secondWindow.setFragFunc(fragmentFunction);
newWindow.addElement(secondWindow)

const link = new LinkElement("[ GitHub ]", "https://github.com/tortooga2", 3, 12);
link.setColor(foam);
link.setHoverColor(foam);
link.setFontWeight("bold")
mainWindow.addElement(link);

const art = new Art(title_desktop, 1, 1);
art.setColor(gold);
//art.setBackgroundColor(rose);
addElement(art);


render = () => {
  art.render();
  mainWindow.render();
  newWindow.render();
  secondWindow.render();
  link.render();

  //newWindow.render();
  //if (isMobile) {
  //  drawLine("Chase Nagle", 0, 0, 'color: ${gold}')
  //  drawLine("Work in progress! Come back later. ", 8, 10,
  //    `color : ${love}; font-weight: bold; font-style: italic`);

  //link.render();
  //return;
  //}
  //for (let i = 0; i < title_desktop.length; i++) {
  //  drawLine(title_desktop[i], 5, 3 + i, `color: ${gold}; background-color: #232136`);
  //}
  //drawLine("Work in progress! Come back later. ", 8, 10,
  //  `color : ${love}; font-weight: bold; font-style: italic`);
  //newWindow.render();
  //link.render();
  //secondWindow.render();



}

