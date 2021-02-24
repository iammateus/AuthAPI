const jwtHelper = require("../../app/helpers/jwt.helper");
const userMock = require("../_mocks/user.mock");

const mockValidBearerToken = async () => {
    const userData = await userMock.create();
    return mockBearerToken(userData.user._id);
};

const mockBearerToken = (userId) => {
    return "Bearer " + jwtHelper.create({ userId });
};

module.exports = {
    mockValidBearerToken,
    mockBearerToken,
};
