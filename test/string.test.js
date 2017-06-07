import test from 'ava';
import DomProcessor from '../dom-processor';

test('replacement of div with span', t => {
    const processor = createStringBasedReplaceProcessor();
    const result = processor.process('<div></div>');
    t.is(result, '<span></span>');
});

test('unchanged non-matching elements', t => {
    const processor = createStringBasedReplaceProcessor();
    const result = processor.process('<p></p>');
    t.is(result, '<p></p>');
});

const createStringBasedReplaceProcessor = () => {
    const configLoader = {
        load: () => {
            return [{
                selector: 'div',
                replace: '<span></span>'
            }];
        }
    };

    return new DomProcessor(configLoader);
};
