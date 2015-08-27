/**
 * Created by shawnsandy on 8/22/15.
 */
'use strict';

var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

module.exports.appMenu = function () {
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
    },{
        label : 'File',
        submenu: []
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
    }, {
        label: "Windows",
        submenu: []
    },
        {
            label:"Help",
            submenu: []
        }];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
