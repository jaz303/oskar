var oskar = require('../');

window.init = function() {

    var keyboard = oskar();

    keyboard.appendTo(document.body);
    keyboard.sendTo(document.querySelector('input'));

}