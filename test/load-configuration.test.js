import test from 'ava';
import DomProcessor from '../dom-processor';

test('decode entities (replace & with &amp;)', t => {
    const processor = createDecodingProcessor();
    const result = processor.process('&&');
    t.is(result, '&amp;&amp;');
});

test('not decode entities (not replace & with &amp;)', t => {
    const processor = createNonDecodingProcessor();
    const result = processor.process('&&');
    t.is(result, '&&');
});

test('replace <div> with <span> and decode entities', t => {
    const processor = createDecodingProcessor();
    const result = processor.process('<div></div>');
    t.is(result, '<span>&amp;&amp;</span>');
});

test('replace <div> with <span> and not decode entities', t => {
    const processor = createNonDecodingProcessor();
    const result = processor.process('<div></div>');
    t.is(result, '<span>&&</span>');
});

test('leave unmatched elements unchanged and decode entities', t => {
    const processor = createDecodingProcessor();
    const result = processor.process('<p>&&</p>');
    t.is(result, '<p>&amp;&amp;</p>');
});

test('leave unmatched elements unchanged and not decode entities', t => {
    const processor = createNonDecodingProcessor();
    const result = processor.process('<p>&&</p>');
    t.is(result, '<p>&&</p>');
});

const createDecodingProcessor = () => {
    return createProcessor(true);
};

const createNonDecodingProcessor = () => {
    return createProcessor(false);
};

const createProcessor = (decodeEntities) => {
    const configLoader = {
        load: () => {
            return [{
                selector: 'div',
                replace: () => { return '<span>&&</span>'; }
            }];
        },
        loadConfigurations: { decodeEntities }
    };

    return new DomProcessor(configLoader);
};
