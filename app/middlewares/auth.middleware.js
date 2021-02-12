const jwtHelper = require("../helpers/jwt.helper");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const auth = (req, res, next) => {
    const token = getAuthorizationBearerToken(req);
    if (!jwtHelper.check(token)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: ReasonPhrases.UNAUTHORIZED,
        });
    }
    next();
};

const getAuthorizationBearerToken = (req) => {
    const header = req.header("Authorization");
    if (header) {
        return header.replace("Bearer ", "");
    }
};

module.exports = auth;
