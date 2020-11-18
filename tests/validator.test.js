const validator = require("../app/validations/validator");
const Joi = require("joi");

const getJoiSchema = () => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema;
};

describe("validator:validate", () => {
    it("should be a function", () => {
        expect(validator.validate).toBeInstanceOf(Function);
    });
    it("should execute joy schema param's validation", () => {
        const mokedSchema = { validate: jest.fn() };
        validator.validate(mokedSchema);
        expect(mokedSchema.validate.mock.calls.length).toBe(1);
    });
    it("should throw error when validation fails", () => {
        const data = {};
        const mokedSchema = getJoiSchema();
        expect(function () {
            validator.validate(mokedSchema, data);
        }).toThrow({
            message: '"name" is required',
            path: ["name"],
            type: "any.required",
            context: { label: "name", key: "name" },
        });
    });
});
