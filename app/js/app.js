/**
 * Created by shawnsandy on 8/26/15.
 */


var ipc = require('ipc');

var settingsBtn = document.getElementById('settings-btn');

console.log(settingsBtn);

settingsBtn.addEventListener('click', function(e){
    console.log('Setting Button');
    ipc.send('open-settings-window');

});


var closeApp = document.getElementById('close-app');
    closeApp.addEventListener('click', function(e){
        ipc.send('close-app');
})

var minimizeApp = document.getElementById('minimize-app');
    minimizeApp.addEventListener('click', function(e){
        ipc.send('minimize-app');
})

var maximizeApp = document.getElementById('maximize-app');
    maximizeApp.addEventListener('click', function(e){
        ipc.send('maximize-app');
})
