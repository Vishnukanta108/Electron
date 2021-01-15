const path = require('path')
const url = require('url')
const { app, BrowserWindow } = require('electron')

const isWatchMode =
  process.env.NODE_ENV === 'development' && process.env.WATCH_MODE === 'true'

if (isWatchMode) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

const getFileUrl = (filePath) => `file://${filePath}`

let win

function createWindow() {
  win = new BrowserWindow({
    width: 700,
    height: 500,
    icon: __dirname + '/icon/icon.png'
  })

  win.loadURL(getFileUrl(path.join(__dirname, 'index.html')))
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})
