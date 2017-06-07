import test from 'ava';
import DomProcessor from '../dom-processor';

test('replacement of div with span', t => {
    const processor = createDivToSpanProcessor();
    const result = processor.process('<div></div>');
    t.is(result, '<span></span>');
});

test('unchanged non-matching elements', t => {
    const processor = createDivToSpanProcessor();
    const result = processor.process('<p></p>');
    t.is(result, '<p></p>');
});

const createDivToSpanProcessor = () => {
    const configLoader = {
        load: () => {
            return [{
                selector: 'div',
                replace: () => { return '<span></span>'; }
            }];
        }
    };

    return new DomProcessor(configLoader);
};
