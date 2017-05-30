module.exports = (questionset, answers) => {
    let results = questionset.map((curr) => {
        if (!Object.keys(answers).includes(curr.id)) {
            return curr;
        }
    });

    console.log(results);
    return results;
};
