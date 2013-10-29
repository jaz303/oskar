;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var oskar = require('../');

window.init = function() {

    var keyboard = oskar();

    keyboard.appendTo(document.body);
    keyboard.sendTo(document.querySelector('input'));

}
},{"../":2}],2:[function(require,module,exports){
var DEFAULT_KEYS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', {cap: '\u232b', value: 'backspace'}],
    [' ']
];

function parseKey(key) {
    if (typeof key === 'string') {
        key = {cap: key};
    }
    if (key.cap === ' ' && !key.className) {
        key.className = 'space';
    }
    if (!key.value) {
        key.value = key.cap;
    }
    return key;
}

function Oskar(opts) {

    opts = opts || {};

    this.keyMap = opts.keys || DEFAULT_KEYS;
    this.onkeypress = opts.onkeypress || function() {};
    
    var el = this.el = document.createElement('div');
    el.className = 'osk';

    this.keyMap.forEach(function(rowKeys, ix) {
        var rowEl = document.createElement('div');
        el.appendChild(rowEl);
        rowEl.className = 'osk-row osk-row-' + ix;
        rowKeys.forEach(function(key) {

            key = parseKey(key);

            var keyEl = document.createElement('a');
            keyEl.href = '#';
            keyEl.className = 'osk-key';
            keyEl.textContent = key.cap;
            keyEl.setAttribute('data-key-value', key.value);
            if ('className' in key) {
                keyEl.className += ' ' + key.className;
            }

            rowEl.appendChild(keyEl);

        }, this);
    }, this);

    var self = this;

    el.addEventListener('click', function(evt) {

        if (!self.onkeypress)
            return;

        if (evt.target.className.indexOf('osk-key') === 0) {
            evt.preventDefault();
            var value = evt.target.getAttribute('data-key-value');
            self.onkeypress(value);
        }
    
    });

}

Oskar.prototype.appendTo = function(el) {
    el.appendChild(this.el);
}

Oskar.prototype.sendTo = function(input, opts) {

    opts = opts || {};

    if (typeof opts === 'function')
        opts = {oncomplete: opts};
    
    var oncomplete    = opts.oncomplete || function() {},
        clearOnEnter  = !!opts.clearOnEnter;
    
    this.onkeypress = function(key) {
        if (key === 'backspace') {
            input.value = input.value.substring(0, input.value.length - 1);
        } else if (key === 'enter') {
            oncomplete(input.value);
            if (clearOnEnter) {
                input.value = '';
            }
        } else {
            input.value += key;
        }
    }

}

module.exports = function(options) {
    return new Oskar(options);
};

module.exports.Oskar = Oskar;
},{}]},{},[1])
;