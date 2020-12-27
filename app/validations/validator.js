const validate = async (joiSchema, data) => {
    try {
        await joiSchema.validateAsync(data);
    } catch (error) {
        throw error.details[0];
    }
};

module.exports = { validate };
