const jwtHelper = require("../helpers/jwt.helper");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
    const token = getAuthorizationBearerToken(req);
    if (jwtHelper.check(token)) {
        return next();
    }
    res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
    });
};

const getAuthorizationBearerToken = (req) => {
    const header = req.header("Authorization");
    if (header && hasBearerToken(header)) {
        return header.replace("Bearer ", "");
    }
};

const hasBearerToken = (header) => {
    return header.includes("Bearer ");
};

module.exports = authMiddleware;
