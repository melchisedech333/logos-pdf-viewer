
/*
** Deus é Santo!
*/

const {app, BrowserWindow} = require('electron') 
const path = require('path') 
const url = require('url')

let win = null
app.allowRendererProcessReuse = true;

app.once('ready', () => {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      devTools: true, // false if you want to remove dev tools access for the user
      contextIsolation: true,
      enableRemoteModule: true, // required for print function [removed since Electron 12, uses https://github.com/electron/remote]
      webviewTag: true, // https://www.electronjs.org/docs/api/webview-tag,
      preload: path.join(__dirname, "preload.js"), // required for print function
    }
  })
  
  win.setMenuBarVisibility(false)
  win.center()
  //win.webContents.openDevTools()
  win.webContents.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36');

  //win.loadURL('http://translate.google.com');

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'web/viewer.html'),
    protocol: 'file:',
    slashes: true
  }), {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36'
  })
  
  // Show window when page is ready
  win.once('ready-to-show', () => {
    win.show()
  })
})


