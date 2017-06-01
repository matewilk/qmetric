let R = require('ramda');

module.exports.flattenTree = (questionset, answers) => {
    let output = [];
    module.exports.parse(questionset, answers, '', output);

    return output;
};

module.exports.parse = (questionset, answers, id, output) => {
    questionset.map((curr) => {
        let test = id === '' ? curr.id : `${id}-${curr.id}`;
        output.push(Object.assign(curr, {id: test}));

        if (Object.keys(curr).includes('groups')) {
            let answer = answers[test];
            let trigger = R.find(R.propEq('trigger', answer))(curr.groups);

            test += trigger ? `-${trigger.trigger}` : '';

            curr.groups.filter(
                module.exports.filterGroup(trigger)
            ).map((it) => {
                return module.exports.parse(it.questions, answers, test, output);
            });
        }
    });
};

module.exports.getSubset = (item) => {
    Object.keys(item).includes('questions');
};

module.exports.filterGroup = (trigger) => {
    return (item) => {
        if (trigger) {
            return item.trigger === trigger.trigger;
        } else {
            return false;
        }
    };
};
