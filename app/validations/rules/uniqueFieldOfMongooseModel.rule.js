const uniqueFieldOfMongooseModel = async (model, field, value, helpers) => {
    const record = await model.findOne({ [field]: value });
    if (record) {
        throw { details: [{ message: '"' + field + '" is already in use' }] };
    }
};

module.exports = uniqueFieldOfMongooseModel;
