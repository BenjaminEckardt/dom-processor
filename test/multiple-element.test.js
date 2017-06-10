import test from 'ava';
import DomProcessor from '../dom-processor';

test('replace `<div text="test">` with `test`', t => {
    const processor = createAttributeExtractingProcessor();
    const result = processor.process('<div text="test">');
    t.is(result, 'test');
});

test('replace multiple matching elements with corresponding attribute content', t => {
    const processor = createAttributeExtractingProcessor();
    const result = processor.process('<div text="first"></div><div text="second"></div>');
    t.is(result, 'firstsecond');
});

const createAttributeExtractingProcessor = () => {
    const configLoader = {
        load: () => {
            return [{
                selector: 'div',
                replace: ($element) => { return $element.attr('text'); }
            }];
        }
    };

    return new DomProcessor(configLoader);
};
