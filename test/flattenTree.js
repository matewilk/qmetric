const test = require('ava');

const answers = require('../examples/answers');
const output = require('../examples/expectedOutput');
const questionset = require('../examples/questionset');

const { flattenTree, parse } = require('../lib/flattenTree');


test.todo('flattens correctly the provided examples');

test('flatten tree should return a correct answer', t => {
    t.is(flattenTree(questionset, answers), output);
});

test('should match answers with questionset ids', t => {
    // t.is(parse(), '123', '123');
});

test('should be able to recognise the type of the question', t => {

});

test('should recursively parse question object', t => {

});

test('should look for a question trigger', t => {

});

test('should build an output object on each level', t => {

});
