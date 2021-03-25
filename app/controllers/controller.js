const validator = require("../validations/validator");
const { StatusCodes } = require("http-status-codes");

const validate = async (data, joySchema, res) => {
    try {
        await validator.validate(data, joySchema);
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            message: err.message,
        });
    }
};

module.exports = {
    validate,
};
