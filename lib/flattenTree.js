let R = require('ramda');

module.exports.flattenTree = (questionset, answers) => {
    return module.exports.answerQuestions(questionset, answers);
};

module.exports.answerQuestions = (questionset, answers, id = '', output = []) => {
    questionset.map((question) => {
        let outputId = module.exports.appendId(question, id);
        output.push(module.exports.createOutputRecord(question, outputId));

        if (R.keys(question).includes('groups')) {
            module.exports.drillDown(question, answers, outputId, output);
        }
    });

    return output;
};

module.exports.drillDown = (question, answers, outputId, output) => {
    let answer = answers[outputId];
    let trigger = R.find(R.propEq('trigger', answer))(question.groups);
    outputId = module.exports.appendTrigger(trigger, outputId);

    question.groups
      .filter(module.exports.filterGroup(trigger))
      .map(group => module.exports.answerQuestions(group.questions, answers, outputId, output));
};

module.exports.createOutputRecord = (question, id) => {
    return Object.assign({}, {
      id,
      type: question.type === 'integer' ? 'number' : question.type,
      text: question.question
    });
};

module.exports.appendId = (item, id) => {
    return id === '' ? item.id : `${id}-${item.id}`;
};

module.exports.appendTrigger = (trigger, id) => {
    return id += trigger ? `-${trigger.trigger}` : '';
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
