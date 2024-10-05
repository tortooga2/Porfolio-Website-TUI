const title_desktop = [
  ` ██████╗██╗  ██╗ █████╗ ███████╗███████╗    ███╗   ██╗ █████╗  ██████╗ ██╗     ███████╗`,
  `██╔════╝██║  ██║██╔══██╗██╔════╝██╔════╝    ████╗  ██║██╔══██╗██╔════╝ ██║     ██╔════╝`,
  `██║     ███████║███████║███████╗█████╗      ██╔██╗ ██║███████║██║  ███╗██║     █████╗  `,
  `██║     ██╔══██║██╔══██║╚════██║██╔══╝      ██║╚██╗██║██╔══██║██║   ██║██║     ██╔══╝  `,
  `╚██████╗██║  ██║██║  ██║███████║███████╗    ██║ ╚████║██║  ██║╚██████╔╝███████╗███████╗`,
  ` ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝`,
]

const mainWindow = new Window(70, 50, 10, 12);
mainWindow.setBorderStyle("single");
mainWindow.setHoverFragFunc(fragmentFunction);
mainWindow.setBorderColor(muted);
addElement(mainWindow);



const github_link = new LinkElement("[ GitHub]", "https://github.com/tortooga2", 24, 9);
github_link.setColor(text);
github_link.setHoverColor(text);
github_link.setFontWeight("bold")
addElement(github_link);

const linkin_link = new LinkElement("[󰌻 Linkedin]", "https://linkedin.com/in/chase-nagle-7069a6212", 38, 9)
linkin_link.setColor(foam);
linkin_link.setHoverColor(foam);
linkin_link.setFontWeight("bold");
addElement(linkin_link);

const cv_link = new LinkElement("[ Resume]", "/static/files/Chase_Nagle_CV.pdf", 55, 9)
cv_link.setColor(love);
cv_link.setHoverColor(love);
cv_link.setFontWeight("bold");
addElement(cv_link);

const art = new Art(title_desktop, 1, 1);
art.setColor(gold);
//art.setBackgroundColor(rose);
addElement(art);


render = () => {
  art.render();
  mainWindow.render();

  github_link.render();
  linkin_link.render();
  cv_link.render();

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

