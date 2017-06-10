'use strict';
var assert = console.assert;
var DomProcessor = require('../dom-processor');

describe('load configuration', function() {

  var configLoader = {
    load: function() {
      return [{
        selector: 'div',
        replace: function() {
          return '<span>&&</span>';
        }
      }];
    }
  };

  var processor = new DomProcessor(configLoader);

  it('should decode entities (replace & with &amp;)', function() {
    configLoader.loadConfigurations = {decodeEntities: true};
    var result = processor.process('&&');
    assert(result === '&amp;&amp;');
  });

  it('should not decode entities (not replace & with &amp;)', function() {
    configLoader.loadConfigurations = {decodeEntities: false};
    var result = processor.process('&&');
    assert(result === '&&');
  });

  it('should replace <div> with <span> and decode entities', function() {
    configLoader.loadConfigurations = {decodeEntities: true};
    var result = processor.process('<div></div>');

    assert(result === '<span>&amp;&amp;</span>');
  });

  it('should replace <div> with <span> and not decode entities', function() {
    configLoader.loadConfigurations = {decodeEntities: false};
    var result = processor.process('<div></div>');

    assert(result === '<span>&&</span>');
  });

  it('should leave unmatched elements unchanged and decode entities', function() {
    configLoader.loadConfigurations = {decodeEntities: true};
    var result = processor.process('<p>&&</p>');

    assert(result === '<p>&amp;&amp;</p>');
  });

  it('should leave unmatched elements unchanged and not decode entities', function() {
    configLoader.loadConfigurations = {decodeEntities: false};
    var result = processor.process('<p>&&</p>');

    assert(result === '<p>&&</p>');
  });
});
