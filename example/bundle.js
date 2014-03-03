(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var oskar = require('../');

window.init = function() {

    var keyboard = oskar();

    keyboard.appendTo(document.body);
    keyboard.sendTo(document.querySelector('input'));

}
},{"../":2}],2:[function(require,module,exports){
var DEFAULT_KEYS = {
    0: [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        [{cap: '\u21e7', toLayer: 1, className: 'shift'},
            'z', 'x', 'c', 'v', 'b', 'n', 'm', {cap: '\u232b', value: 'backspace'}],
        [' ']
    ],
    1: [
        ['!', '@', '£', '$', '%', '^', '&', '*', '(', ')'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        [{cap: '\u21e7', toLayer: 0, className: 'shift'},
            'Z', 'X', 'C', 'V', 'B', 'N', 'M', {cap: '\u232b', value: 'backspace'}],
        [' ']
    ]
};

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
    this.layers = {};
    this.activeLayer = null;

    var rootEl = this.el = document.createElement('div');
    rootEl.className = 'osk';

    var keys = opts.keys || DEFAULT_KEYS, layerIx = 0;

    for (var k in keys) {

        var layerEl = document.createElement('div');
        layerEl.className = 'osk-layer osk-layer-' + k;

        if (layerIx++ === 0) {
            layerEl.style.display = 'block';
            this.activeLayer = k;
        } else {
            layerEl.style.display = 'none';
        }

        keys[k].forEach(function(rowKeys, ix) {

            var rowEl = document.createElement('div');
            rowEl.className = 'osk-row osk-row-' + ix;
            layerEl.appendChild(rowEl);

            rowKeys.forEach(function(key) {
                
                key = parseKey(key);

                var keyEl = document.createElement('a');
                keyEl.href = '#';
                keyEl.className = 'osk-key';
                keyEl.textContent = key.cap;
                keyEl.oskarKey = key;
                if ('className' in key) {
                    keyEl.className += ' ' + key.className;
                }

                rowEl.appendChild(keyEl);
            
            });

            rootEl.appendChild(layerEl);

            return layerEl;

        });

        this.layers[k] = layerEl;

    }

    var self = this;

    rootEl.addEventListener('click', function(evt) {

        var key = evt.target.oskarKey;
        if (!key)
            return;

        evt.preventDefault();

        if ('toLayer' in key) {
            self.showLayer(key.toLayer);
        } else if ('value' in key) {
            self.onkeypress(key.value);
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

Oskar.prototype.showLayer = function(layer) {
    
    layer = '' + layer;
    
    if (layer === this.activeLayer) {
        return;
    }

    this.layers[this.activeLayer].style.display = 'none';
    this.layers[layer].style.display = 'block';

    this.activeLayer = layer;

}

module.exports = function(options) {
    return new Oskar(options);
};

module.exports.Oskar = Oskar;
},{}]},{},[1])