let R = require('ramda');

module.exports.flattenTree = (questionset, answers) => {
    let results = questionset.map((curr) => {
        console.log(curr);
        if (Object.keys(curr).includes('groups')) {
            let answer = answers[curr.id];
            let trigger = R.find(R.propEq('trigger', answer))(curr.groups);
            let filteredGroups = curr.groups
            .filter(
                module.exports.filterGroup(trigger)
            );

            filteredGroups.map((it) => {
                return module.exports.flattenTree(it.questions, answers);
            });
        }
    });

    return results;
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
