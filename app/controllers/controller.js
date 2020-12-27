const validator = require("../validations/validator");
const { StatusCodes } = require("http-status-codes");

const validate = async (data, joySchema, res) => {
    try {
        await validator.validate(joySchema, data);
    } catch (error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
    }
};

module.exports = {
    validate,
};
