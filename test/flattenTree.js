const test = require('ava');

const answers = require('../examples/answers');
const output = require('../examples/expectedOutput');
const questionset = require('../examples/questionset');

const {
		flattenTree,
		parse,
		createOutputRecord,
		appendId,
		appendTrigger,
		filterGroup
} = require('../lib/flattenTree');


test('flattenTree function should return the correct answer', t => {
		let out = flattenTree(questionset, answers);
    t.deepEqual(out, output);
});

test('createOutputRecord should return object with 3 properties', t => {
		let question = {id: 1, type: 'integer', question: 'question', rubish: 'do not want'};
		let obj = createOutputRecord(question, '123');

		t.deepEqual(obj, {id: '123', type: 'number', text: 'question'});
});

test('appendId should return item.id if second param is empty string', t => {
		let item = {id: 'abc'};
		let out = appendId(item, '');

		t.is(out, 'abc');
});

test('appendId should return prepend second param to item.id', t => {
		let item = {id: 'abc'};
		let out = appendId(item, 'abc');

		t.is(out, 'abc-abc');
});

test('filterGroup should return true if trigger is equal item.trigger', t => {
		let item = {trigger: 'test'};
		let trigger = {trigger: 'test'};
		let out = filterGroup(trigger)(item);

		t.is(out, true);
});

test('filterGroup should return false if trigger is not equal item.trigger', t => {
		let item = {trigger: 'test'};
		let trigger = {trigger: 'no-no-no'};
		let out = filterGroup(trigger)(item);

		t.is(out, false);
});

test('filterGroup should return false if trigger does not exist', t => {
		let item = {trigger: 'test'};
		let out = filterGroup()(item);

		t.is(out, false);
});
