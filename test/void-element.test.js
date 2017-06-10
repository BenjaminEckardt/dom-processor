import test from 'ava';
import DomProcessor from '../dom-processor';

test('replacement of void elements', t => {
    const processor = createImgToInputProcessor();
    const result = processor.process('<img/>');
    t.is(result, '<input>');
});

const createImgToInputProcessor = () => {
    const configLoader = {
        load: () => {
            return [{
                selector: 'img',
                replace: () => { return '<input>'; }
            }];
        }
    };

    return new DomProcessor(configLoader);
};
