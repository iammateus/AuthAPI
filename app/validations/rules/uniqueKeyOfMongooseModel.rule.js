const uniqueKeyOfMongooseModel = async (key, model, value, helpers) => {
    const record = await model.findOne({ [key]: value });
    const error = { message: `"${key}" is already in use` };
    if (record) {
        throw { details: [error] };
    }
};

module.exports = uniqueKeyOfMongooseModel;
