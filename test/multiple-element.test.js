'use strict';
var assert = console.assert;
var DomProcessor = require('../dom-processor');

describe('multiple element test (replace function should get the corresponding element)', function() {

    var configLoader = {
        load: function() {
            return [{
                selector: 'div',
                replace: function($element) {
                    return $element.attr('text');
                }
            }];
        }
    };

    var processor = new DomProcessor(configLoader);

    it('should replace <div text="test"> with test', function() {
        var result = processor.process('<div text="test"></div>');

        assert(result === 'test');
    });

    it('should replace <div text="test"></div><div text="secondtest"></div> with test-secondtest', function() {
        var result = processor.process('<div text="test"></div><div text="-secondtest"></div>');
        assert(result === 'test-secondtest');
    });

});