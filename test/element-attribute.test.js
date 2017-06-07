import test from 'ava';
import DomProcessor from '../dom-processor';

test('replacement using attributes of input element', t => {
    const processor = createAttributeUsingProcessor();
    const result = processor.process('<div id="foo"></div>');
    t.is(result, '<span id="foo"></span>');
});

const createAttributeUsingProcessor = () => {
    const configLoader = {
        load: () => {
            return [{
                selector: 'div',
                replace: ($element) => {
                    const id = $element.attr('id');
                    return `<span id=${id}></span`;
                }
            }];
        }
    };

    return new DomProcessor(configLoader);
};
