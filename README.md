# oskar

Oskar is a lightweight Javascript module for generating on-screen keyboards. It might look like the screenshot below, but that's up to you - it's fully customisable with CSS.

![Oskar Screenshot](https://raw.github.com/jaz303/oskar/master/screenshot.png)

## Note

Hacker, I beseech thee; use browserify. Please. Life's too short for `require.js` and all the associated fuckery.

## Basic Usage

    var oskar = require('oskar');

    var keyboard = oskar();
    keyboard.appendTo(document.body);

That's it!

## Customisation

Oskar's keymap is fully customisable. A keymap is specified as a named set of _layers_, only one of which is visible at any given time. Any key may specify a transition to a different layer, allowing implementation of any number of alternate layouts. This is useful, for example, for implementing a  shift key.

A layer itself is specified as an array of rows, each row being an array of key descriptors. A key descriptor can be either:

  * an object, recognised properties being:
    * `cap`, string: symbol to display on keyboard
    * `value`, any type: value to emit when this key is pressed (defaults to the key cap itself)
    * `toLayer`, string: switch to this layer on key press (for implementing shift etc)
    * `className`, string: additional class name to be added to this key's DOM element
  * a string, shorthand for `{cap: $string}`

As a special case, any key specified by a single space `' '` will be automatically augmented with the `space` class.

Here's the default keymap which supports lower/upper-case letters, digits, and some punctuation:

```javascript
var keyMap = {
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
```

And custom keymaps are passed via the options object:

    var keyboard = oskar({keyMap: keys});

## Handling Events

The configuration option `onkeypress` is used to supply a function that will be called when the user presses a key on the keyboard. It receives a single argument: the value of the pressed key.

    var keyboard = oskar({onkeypress: function(value) {
        console.log("you pressed: " + value);
    }});

As a convenience, Oskar provides a `sendTo()` method which will automatically hook its output up to an `input` element:

    var keyboard = oskar();
    keyboard.sendTo(document.querySelector('input[type=text]'));

The installed handler recognises a couple of special key values:

  * `backspace`: deletes the last character
  * `enter`: triggers a user-specified callback - passed as a second parameter to `sendTo() - with the `input` element's current value.

## Styling

Oskar uses a bunch of classes to identify its various elements:

  * `.osk`: wrapper element
  * `.osk-row`: each row of keys
  * `.osk-row-{n}`: nth row of keys (zero-indexed)
  * `.osk-key`: an individual key
  * `.osk-key.$keyClass`: keys can be given specific classes; see Customisation, above

Please refer to the styles in `example/index.htm` to see a bloat-free working example.