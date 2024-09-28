const title_desktop = [
  ` ██████╗██╗  ██╗ █████╗ ███████╗███████╗    ███╗   ██╗ █████╗  ██████╗ ██╗     ███████╗`,
  `██╔════╝██║  ██║██╔══██╗██╔════╝██╔════╝    ████╗  ██║██╔══██╗██╔════╝ ██║     ██╔════╝`,
  `██║     ███████║███████║███████╗█████╗      ██╔██╗ ██║███████║██║  ███╗██║     █████╗  `,
  `██║     ██╔══██║██╔══██║╚════██║██╔══╝      ██║╚██╗██║██╔══██║██║   ██║██║     ██╔══╝  `,
  `╚██████╗██║  ██║██║  ██║███████║███████╗    ██║ ╚████║██║  ██║╚██████╔╝███████╗███████╗`,
  ` ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝`,
]

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
//
//
const mobile_link = new LinkElement("[ GitHub ]", "https://github.com/tortooga2", 3, 3);
mobile_link.setColor(foam);
mobile_link.setHoverColor(foam);




render = () => {
  if (!isMobile) {
    for (let i = 0; i < title_desktop.length; i++) {
      drawLine(title_desktop[i], 5, 3 + i, `color: ${gold}; background-color: #232136`);
    }
    drawLine("Work in progress! Come back later. ", 8, 10,
      `color : ${love}; font-weight: bold; font-style: italic`);
    newWindow.render();
    link.render();
    secondWindow.render();
  }
  if (isMobile) {
    drawLine("Chase Nagle", 2, 2, `color: ${gold}; background-color: #232136`)
    mobile_link.render();




  }

}

