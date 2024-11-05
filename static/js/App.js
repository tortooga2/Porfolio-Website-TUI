const title_desktop = [
  ` ██████╗██╗  ██╗ █████╗ ███████╗███████╗    ███╗   ██╗ █████╗  ██████╗ ██╗     ███████╗`,
  `██╔════╝██║  ██║██╔══██╗██╔════╝██╔════╝    ████╗  ██║██╔══██╗██╔════╝ ██║     ██╔════╝`,
  `██║     ███████║███████║███████╗█████╗      ██╔██╗ ██║███████║██║  ███╗██║     █████╗  `,
  `██║     ██╔══██║██╔══██║╚════██║██╔══╝      ██║╚██╗██║██╔══██║██║   ██║██║     ██╔══╝  `,
  `╚██████╗██║  ██║██║  ██║███████║███████╗    ██║ ╚████║██║  ██║╚██████╔╝███████╗███████╗`,
  ` ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝`,
];




const mainWindow = new Window(100, 50, Math.floor(width / 2) - 50, Math.floor(height / 2) - 25);
mainWindow.setBorderStyle("double");
mainWindow.setHoverFragFunc(fragmentFunction);
mainWindow.setBorderColor(Colors.muted);
addElement(mainWindow);

const vertWindow = new Vertical_Align(1, 1, Math.floor(mainWindow.w / 2), 1);
vertWindow.setBorderStyle("double");
vertWindow.setHoverFragFunc(fragmentFunction);
vertWindow.setBorderColor(Colors.muted);
mainWindow.addElement(vertWindow);

const art = new Art(title_desktop, 7, 2);
art.setColor(Colors.gold);
vertWindow.addElement(art);

const horzWindow = new Horizontal_Align(1, 1, 0, 0);
vertWindow.addElement(horzWindow);
horzWindow.setMargin(10);


const github_link = new LinkElement(
  "[ GitHub]",
  "https://github.com/tortooga2",
  29,
  10,
);
github_link.setColor(Colors.text);
github_link.setHoverColor(Colors.text);
github_link.setFontWeight("bold");
horzWindow.addElement(github_link);

const linkin_link = new LinkElement(
  "[ Linkedin]",
  "https://linkedin.com/in/chase-nagle-7069a6212",
  44,
  10,
);
linkin_link.setColor(Colors.foam);
linkin_link.setHoverColor(Colors.foam);
linkin_link.setFontWeight("bold");
horzWindow.addElement(linkin_link);

const cv_link = new LinkElement(
  "[ Resume]",
  "/static/files/Chase_Nagle_CV.pdf",
  61,
  10,
);
cv_link.setColor(Colors.love);
cv_link.setHoverColor(Colors.love);
cv_link.setFontWeight("bold");
horzWindow.addElement(cv_link);



let current_window = "Home"

const close_button = new Button("[X]", 96, 1);
close_button.setOnClick(() => { current_window = "None" })
close_button.setHoverColor(Colors.muted)
mainWindow.addElement(close_button);

const work_in_progress = new Button(" Work in Progress. Sorry recruiters but Midterms is more Important. ", 1, 13);
work_in_progress.setHoverColor(Colors.love);
vertWindow.addElement(work_in_progress);



render = () => {
  if (current_window === "Home") {
    mainWindow.render();
    art.render();


    github_link.render();
    linkin_link.render();
    cv_link.render();

    close_button.render();

    work_in_progress.render();
  }




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
};
