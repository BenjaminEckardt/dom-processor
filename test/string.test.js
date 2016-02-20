'use strict';
var assert = console.assert;
var DomProcessor = require('../dom-processor');

describe('configuration using string replace', function() {

  var configLoader = {
    load: function() {
      return [{
        selector: 'div',
        replace: '<span></span>'
      }];
    }
  };

  var processor = new DomProcessor(configLoader);

  it('should replace <div> with <span>', function() {
    var result = processor.process('<div></div>');

    assert(result === '<span></span>');
  });

  it('should leave unmatched elements unchanged', function() {
    var result = processor.process('<p></p>');

    assert(result === '<p></p>');
  });
});
