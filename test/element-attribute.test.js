'use strict';
var assert = console.assert;
var DomProcessor = require('../dom-processor');

describe('configuration using current path', function() {
  var FILE = 'aFile';
  var ANOTHER_FILE = 'anotherFile';

  var configLoader = {
    load: function(currentPath) {
      if(currentPath === FILE) {
        return [{
          selector: 'div',
          replace: function() { return '<span></span>'; }
        }];
      } else {
        return [{
          selector: 'div',
          replace: function() { return '<p></p>'; }
        }];
      }
    }
  };

  var processor = new DomProcessor(configLoader);

  it('should replace <div> with <span>', function() {
    var result = processor.process('<div></div>', FILE);

    assert(result === '<span></span>');
  });

  it('should replace <div> with <p>', function() {
    var result = processor.process('<div></div>', ANOTHER_FILE);

    assert(result === '<p></p>');
  });
});
