const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { hash } = require("../helpers/passwordHash.helper");

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
});

UserSchema.pre("save", async function save(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await hash(this.password);
        return next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model("User", UserSchema);
