'use strict';
var assert = console.assert;
var DomProcessor = require('../dom-processor');

describe('configuration using attributes of selected elements', function() {

  var configLoader = {
    load: function() {
      return [{
        selector: 'div',
        replace: function($element) {
          var id =  $element.attr('id');
          return '<span id="' + id + '"></span>';
        }
      }];
    }
  };

  var processor = new DomProcessor(configLoader);

  it('should replace <div> with <span> and keep the `id`', function() {
    var result = processor.process('<div id="foo"></div>');

    assert(result === '<span id="foo"></span>');
  });
});
