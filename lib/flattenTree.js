let R = require('ramda');

module.exports.flattenTree = (questionset, answers) => {
    let results = questionset.map((curr) => {
        console.log(curr);
        if (Object.keys(curr).includes('groups')) {
            let subset = curr.groups.map((it) => {
                return module.exports.flattenTree(it.questions, answers);
            });
        }
    });

    return results;
};

module.exports.getSubset = (item) => {
    Object.keys(item).includes('questions');
};

module.exports.filterGroup = (item) => {
    item.trigger === 'YES';
};
