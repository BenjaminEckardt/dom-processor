var assert = console.assert;
var domProcessor = require('../dom-processor');

describe('configuration using attributes of selected elements', function() {

  var configFactory = function() {
    return [{
      selector: 'div',
      replace: function($element) {
        var id =  $element.attr('id');
        return '<span id="' + id + '"></span>';
      }
    }];
  };

  beforeEach(function() {
    domProcessor.config(configFactory);
  });

  it('should replace <div> with <span> and keep the `id`', function() {
    var result = domProcessor.process('<div id="foo"></div>');

    assert(result === '<span id="foo"></span>');
  });
});
