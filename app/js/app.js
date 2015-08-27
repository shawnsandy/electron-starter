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
