const jwtHelper = require("../../app/helpers/jwt.helper");

const mockBearerToken = (user) => {
    return "Bearer " + jwtHelper.create({ userId: user._id });
};

module.exports = {
    mockBearerToken,
};
