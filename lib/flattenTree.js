let R = require('ramda');

module.exports.flattenTree = (questionset, answers, id = '') => {
    let output = [];
    let results = questionset.map((curr) => {
        let test = id === '' ? curr.id : `${id}-${curr.id}`;
        output.push(Object.assign(curr, {id: test}));
        if (Object.keys(curr).includes('groups')) {
            let answer = answers[test];
            let trigger = R.find(R.propEq('trigger', answer))(curr.groups);
            test += trigger ? `-${trigger.trigger}` : '';
            let filteredGroups = curr.groups
            .filter(
                module.exports.filterGroup(trigger)
            );

            filteredGroups.map((it) => {
                return module.exports.flattenTree(it.questions, answers, test);
            });
        }
    });

    console.log(output);
    return output;
};

module.exports.parse = (question, answer) => {

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
