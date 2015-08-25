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
        title: 'DesKit'
    });

    if (mainWindowState.isMaximized) {
        mainWindow.maximize();
    }

    mainWindow.loadUrl('file://' + __dirname + '/app.html');

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
