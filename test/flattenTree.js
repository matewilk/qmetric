const test = require('ava');

const flattenTree = require('../lib/flattenTree');
const answers = require('../examples/answers');
const output = require('../examples/expectedOutput');
const questionset = require('../examples/questionset');

test.todo('flattens correctly the provided examples');

test('flatten tree should return a correct answer', t => {
    t.is(flattenTree(questionset, answers), [questionset[0], questionset[1]]);
});
