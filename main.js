const path = require('path');
const url = require('url');
const {app, BrowseWindow} = require('electron');

let win;

function createWindow() {
    win = new BrowseWindow({
        width: 700, 
        height: 500, 
        icon: __dirname + "/icon/icon.png"
    });


win.loadURL(url.format({
    pathanme: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
}));

win.webContents.openDevTools();

win.on('closed', () => {
    win = null;
});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});