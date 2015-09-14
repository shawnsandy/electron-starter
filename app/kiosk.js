'use strict';

var app = require('app');
var Menu = require('menu');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');


var mainWindow;

// Preserver of the window size and position between app launches.
var mainWindowState = windowStateKeeper('main', {
    width: 400,
    height: 300
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadUrl('file://' + __dirname + '/kiosk.html');

    if (env.name === 'development') {
        devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function() {
        mainWindowState.saveState(mainWindow);
    });

    // Create the Application's main menu
    var template = [{
        label: "Application",
        submenu: [{
            label: "About Application",
            selector: "orderFrontStandardAboutPanel:"
        }, {
            type: "separator"
        }, {
            label: "Quit",
            accelerator: "Command+Q",
            click: function() {
                app.quit();
            }
        }]
    }, {
        label: "Edit",
        submenu: [{
            label: "Undo",
            accelerator: "Command+Z",
            selector: "undo:"
        }, {
            label: "Redo",
            accelerator: "Shift+Command+Z",
            selector: "redo:"
        }, {
            type: "separator"
        }, {
            label: "Cut",
            accelerator: "Command+X",
            selector: "cut:"
        }, {
            label: "Copy",
            accelerator: "Command+C",
            selector: "copy:"
        }, {
            label: "Paste",
            accelerator: "Command+V",
            selector: "paste:"
        }, {
            label: "Select All",
            accelerator: "Command+A",
            selector: "selectAll:"
        }]
    }];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

});

app.on('window-all-closed', function() {
    app.quit();
});
