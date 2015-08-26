'use strict';

var app = require('app');
var Menu = require('menu');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var env = require('./vendor/electron_boilerplate/env_config');
//var devHelper = require('./vendor/electron_boilerplate/dev_helper');
var mainMenu = require('./js/main-menu');
var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');
//crash reporter
var crashReporter = require('crash-reporter');


crashReporter.start({
    productName: 'YourName',
    companyName: 'YourCompany',
    submitUrl: 'https://your-domain.com/url-to-submit',
    autoSubmit: true
});

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
        icon: __dirname + '/images/icons/neutron.png',
        title: 'Deskit'
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    if (env.name === 'development') {
       // devHelper.setDevMenu();
        mainWindow.openDevTools();
    }

    mainWindow.on('close', function() {
        mainWindowState.saveState(mainWindow);
    });

   mainMenu.appMenu();

});

app.on('window-all-closed', function() {
    app.quit();
});


var settingsWindow = null;

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadUrl('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
