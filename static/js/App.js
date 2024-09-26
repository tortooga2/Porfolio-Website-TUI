const newWindow = new Window(85, 50, 6, 13);
newWindow.setBorderStyle("round");
newWindow.setFragFunc(fragmentFunction);


const secondWindow = new Window(85, 50, 100, 13);
secondWindow.setBorderStyle("double");
secondWindow.setFragFunc(fragmentFunction);


addElement(newWindow);
addElement(secondWindow);
