const uniqueMongoose = async (joySchema, key, value, helpers) => {
    const record = await joySchema.findOne({ [key]: value });
    const error = { message: `"${key}" is already in use` };
    if (record) {
        throw { details: [error] };
    }
};

module.exports = uniqueMongoose;
