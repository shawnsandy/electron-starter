/**
 * Created by shawnsandy on 8/25/15.
 */


'use strict';

module.exports.settings = function(){

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

}
