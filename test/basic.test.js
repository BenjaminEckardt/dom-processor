var assert = console.assert;
var domProcessor = require('../dom-processor');

describe('basic configuration', function() {

  var configFactory = function() {
    return [{
      selector: 'div',
      replace: function() {
        return '<span></span>';
      }
    }];
  };

  beforeEach(function() {
    domProcessor.config(configFactory);
  });

  it('should replace <div> with <span>', function() {
    var result = domProcessor.process('<div></div>');

    assert(result === '<span></span>');
  });

  it('should leave unmatched elements unchanged', function() {
    var result = domProcessor.process('<p></p>');

    assert(result === '<p></p>');
  });
});
