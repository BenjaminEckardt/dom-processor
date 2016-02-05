var assert = console.assert;
var domProcessor = require('../dom-processor');

describe('configuration using current path', function() {
  var FILE = 'aFile';
  var ANOTHER_FILE = 'anotherFile';

  var configFactory = function(currentPath) {
    if(currentPath === FILE) {
      return [{
        selector: 'div',
        replace: function() {
          return '<span></span>';
        }
      }];
    } else {
      return [{
        selector: 'div',
        replace: function() {
          return '<p></p>';
        }
      }];
    }
  };

  beforeEach(function() {
    domProcessor.config(configFactory);
  });

  it('should replace <div> with <span>', function() {
    var result = domProcessor.process('<div></div>', FILE);

    assert(result === '<span></span>');
  });

  it('should replace <div> with <p>', function() {
    var result = domProcessor.process('<div></div>', ANOTHER_FILE);

    assert(result === '<p></p>');
  });
});
