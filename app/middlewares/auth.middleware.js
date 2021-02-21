const jwtHelper = require("../helpers/jwt.helper");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
    const token = getAuthorizationBearerToken(req);
    const parsedToken = jwtHelper.check(token);
    if (parsedToken && parsedToken.id) {
        return next();
    }
    res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
    });
};

const getAuthorizationBearerToken = (req) => {
    const header = req.header("Authorization");
    if (header && startsWithBearer(header)) {
        return header.replace("Bearer ", "");
    }
};

const startsWithBearer = (header) => {
    return "Bearer " === header.substring(0, 7);
};

module.exports = authMiddleware;
