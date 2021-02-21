const jwtHelper = require("../../app/helpers/jwt.helper");
const userMock = require("../_mocks/user.mock");

const mockValidBearerToken = async () => {
    const userData = await userMock.create();
    return mockBearerToken(userData.user._id);
};

const mockBearerToken = (id) => {
    return "Bearer " + jwtHelper.create({ id });
};

module.exports = {
    mockValidBearerToken,
    mockBearerToken,
};
