import test from 'ava';
import DomProcessor from '../dom-processor';

const A_PATH = 'aPath';
const ANOTHER_PATH = 'anotherPath';

test('replacement of path dependent configuration', t => {
    t.plan(2);

    const processor = createPathDependentProcessor();
    let result = processor.process('<div></div>', A_PATH);
    t.is(result, '<span></span>');

    result = processor.process('<div></div>', ANOTHER_PATH);
    t.is(result, '<p></p>');
});

const createPathDependentProcessor = () => {
    const configLoader = {
        load: (currentPath) => {
            if(currentPath === A_PATH) {
                return [{
                    selector: 'div',
                    replace: () => { return '<span></span>'; }
                }];
            } else {
                return [{
                    selector: 'div',
                    replace: () => { return '<p></p>'; }
                }];
            }
        }
    };

    return new DomProcessor(configLoader);
};
