const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hashHelper = require("../helpers/hash.helper");

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        password: String,
        name: String,
    },
    { timestamps: true }
);

UserSchema.pre("save", async function save(next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await hashHelper.hash(this.password);
        return next();
    } catch (error) {
        return next(error);
    }
});

module.exports = mongoose.model("User", UserSchema);
