'use strict';
var assert = console.assert;
var DomProcessor = require('../dom-processor');

describe('void elements', function() {

  var configLoader = {
    load: function() {
      return [{
        selector: 'img',
        replace: function() {
          return '<input>';
        }
      }];
    }
  };

  var processor = new DomProcessor(configLoader);

  it('should replace <img/> with <input>', function() {
    var result = processor.process('<img/>');

    assert(result === '<input>');
  });
});
