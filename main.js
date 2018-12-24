const { app, BrowserWindow } = require('electron');

/////////////////////////////////////////////////
const fs = require('fs');
const os = require('os');
const ipc = require('electron').ipcMain;
const shell = require('electron').shell;

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win;

  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ show: false });
    win.maximize();
    win.show();
    // and load the index.html of the app.
    win.loadFile('dist/GrabHealth/index.html');

    // Open the DevTools.
    // win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

  //for pdf
  ipc.on('print-to-pdf', function(event) {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    const win = BrowserWindow.fromWebContents(event.sender);

    win.webContents.printToPDF({}, function(error, data) {
      if(error) return console.log(error.message);

      fs.writeFile(pdfPath, data, function(err) {
        if (err) return console.log(err.message);
        shell.openExternal('file://' + pdfPath);
        event.sender.send('wrote-pdf', pdfPath);
      })
    })
  });