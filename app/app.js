// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------

// Browser modules are imported through new ES6 syntax.
import { greet } from './hello_world/hello_world';

// Node modules are required the same way as always.
var os = require('os');
var ipc = require('ipc');


// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

document.getElementById('greet').innerHTML = greet();
document.getElementById('platform-info').innerHTML = os.platform();
document.getElementById('env-name').innerHTML = envName;

var launchBtn = document.getElementById('launch-btn');

launchBtn.addEventListener('click', function(e){
  //e.preventDefault();
  //console.log('launchBtn clicked');
  ipc.send('toggle-window');
});


var launchWeb = document.getElementById('launch-web');
launchWeb.addEventListener('click', function(){
  ipc.send('webview');
});
