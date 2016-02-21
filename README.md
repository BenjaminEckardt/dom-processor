# dom-processor [![Build Status](https://travis-ci.org/BenjaminEckardt/dom-processor.svg?branch=master)](https://travis-ci.org/BenjaminEckardt/dom-processor)

## Install
```sh
npm install dom-processor --save
```

## Examples
### dom-processor
Create a new instance using a [config-loader](#config-loader) and call the `process`-method with the content to be processed.

If the loading of your replacement-configurations depends on the currently processed file make sure to call `process` with the path as second argument.
```js
var configLoader = require('./config-loader');
var DomProcessor = require('dom-processor');

var processor = new DomProcessor(configLoader);

var result = processor.process('<div></div>', 'path/to/file');

console.log(result);
```

### config-loader
An object with a `load`-method which is called with the path of the currently processed file.

The `load`-method returns an `Array` of replacement-configurations. Each replacement has two properties:
- `selector`: [Selector](https://github.com/cheeriojs/cheerio#selectors) of the elements to be replaced.
- `replace`: Function to create and return the new element. It is called with matching [element](https://github.com/cheeriojs/cheerio#attributes) as first argument.

```js
function load(filePath) {
  return [{
    selector: 'div',
    replace: function($element) {
      return '<span></span>';
    }
  }];
}

module.exports = {
  load: load
};
```

## License
MIT © [Benjamin Eckardt](https://github.com/BenjaminEckardt)
