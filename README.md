# oskar

Oskar is a lightweight Javascript module for generating on-screen keyboards. It might look like the screenshot below, but that's up to you - it's fully customisable with CSS.

![Oskar Screenshot](https://raw.github.com/jaz303/oskar/master/screenshot.png)

## Limitations

Oskar does not currently support switching between keyboard variants a la iOS, although patches for such a feature would be most welcome. Javascript-based auto-layout is also not supported - just use CSS.

## Note

Hacker, I beseech thee; use browserify. Please. Life's too short for `require.js` and all the associated fuckery.

## Basic Usage

    var oskar = require('oskar');

    var keyboard = oskar();
    keyboard.appendTo(document.body);

That's it!

## Customisation

The keymap is fully customisable and is specified as an array of rows, each row itself being an array of key descriptors. A key descriptor can be either:

  * an object, recognised properties being:
    * `cap`, string: symbol to display on keyboard
    * `value`, any type: value to emit when this key is pressed (defaults to the key cap itself)
    * `className`, string: additional class name to be added to this key's DOM element
  * a string, shorthand for `{cap: $foo}`

As a special case, any key specified by a single space `' '` will be automatically augmented with the `space` class.

Here's the default keymap:

    var keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', {cap: '\u232b', value: 'backspace'}],
        [' ']
    ];

And custom keymaps are passed via the options object:

    var keyboard = oskar({keyMap: keys});

## Handling Events

The configuration option `onkeypress` is used to supply a function that will be called when the user presses a key on the keyboard. It receives a single argument: the value of the pressed key.

    var keyboard = oskar({onkeypress: function(value) {
        console.log("you pressed: " + value);
    }});

As a convenience, Oskar provides a `sendTo()` method which will automatically hook its output up to an `&lt;input&gt;` element:

    var keyboard = oskar();
    keyboard.sendTo(document.querySelector('input[type=text]'));

The installed handler recognises a couple of special key values:

  * `backspace`: deletes the last character
  * `enter`: triggers a user-specified callback - passed as a second parameter to `sendTo() - with the `&lt;input&gt;` element's current value.

## Styling

Oskar uses a bunch of classes to identify its various elements:

  * `.osk`: wrapper element
  * `.osk-row`: each row of keys
  * `.osk-row-{n}`: nth row of keys (zero-indexed)
  * `.osk-key`: an individual key
  * `.osk-key.$keyClass`: keys can be given specific classes; see Customisation, above

Please refer to the styles in `example/index.htm` to see a bloat-free working example.