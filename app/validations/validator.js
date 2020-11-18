const validate = (joiSchema, data) => {
    const result = joiSchema.validate(data);
    if (result && result.error) {
        throw result.error.details[0];
    }
};

module.exports = { validate };
