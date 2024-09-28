

const newWindow = new Window(85, 50, 6, 13);
newWindow.setBorderStyle("single");
newWindow.setFragFunc(fragmentFunction);
addElement(newWindow)


const secondWindow = new Window(85, 50, 100, 13);
secondWindow.setBorderStyle("double");
secondWindow.setFragFunc(fragmentFunction);
addElement(secondWindow)

const link = new LinkElement("[ GitHub ]", "https://github.com/tortooga2", 8, 12);
link.setColor(foam);
link.setHoverColor(foam);
//secondWindow.addElement(link);


render = () => {
  drawLine("Work in progress! Come back later. ", 8, 10,
    `color : ${love}; font-weight: bold; font-style: italic`);
  newWindow.render();
  link.render();
  secondWindow.render();

}

