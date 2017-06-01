module.exports.flattenTree = (questionset, answers) => {
    let results = questionset.map((curr) => {
        if (!Object.keys(answers).includes(curr.id)) {
            return curr;
        }
    });

    return results;
};

module.exports.parser = () => {
    return '123';
};
