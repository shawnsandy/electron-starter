'use strict';

var app = require('app');
var Menu = require('menu');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');
var jQuery = require('jquery');
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
    width: 1280,
    height: 760
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        icon: __dirname + '/images/icons/neutron.png',
        title: 'Deskit',
        'min-width': 1280,
        'min-height': 760,
        frame: false

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




var settingsWindow = null;

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        height: 400,
        resizable: false,
        width: 300,
        'always-on-top': true
    });

    settingsWindow.loadUrl('file://' + __dirname + '/windows/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});

ipc.on('close-settings-window', function () {
    if (settingsWindow) {
        settingsWindow.close();
    }
});

ipc.on('close-app', function(){
    app.quit();
});

ipc.on('minimize-app', function(){
    if(mainWindow.isMinimized()){
        mainWindow.minimize();
    } else {
        mainWindow.minimize();
    }

});

ipc.on('maximize-app', function(){
    if(mainWindow.isMaximized()){
       mainWindow.maximize()
    } else {
        mainWindow.unmaximize()
    }
});

//app controls buttons


/**
 * sample call to change the current page displayed in the main window
 */
//ipc.on('load-page', function(){
//    mainWindow.loadUrl('file://' + __dirname + '/app.html');
//});

//close all windows

app.on('window-all-closed', function() {
    app.quit();
});
