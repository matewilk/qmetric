let R = require('ramda');

module.exports.flattenTree = (questionset, answers) => {
    let results = questionset.map((curr) => {
        console.log(curr);
        if (Object.keys(curr).includes('groups')) {
            // return curr.groups.map((it) => {
            //     return module.exports.flattenTree(it.questions, answers);
            // });
            curr.groups
            .filter(
                module.exports.filterGroup,
                R.find(R.propEq('trigger', 'YES'))
            )
            .map((it) => {
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

module.exports.filterGroup = (item) => {
    item.trigger === this.trigger;
};
