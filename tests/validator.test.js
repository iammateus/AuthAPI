const validator = require("../app/validations/validator");
const Joi = require("joi");

describe("validator:validate", () => {
    it("should be a function", () => {
        expect(validator.validate).toBeInstanceOf(Function);
    });
    it("should execute joy schema param's validation", () => {
        const mokedSchema = { validate: jest.fn() };
        validator.validate(mokedSchema);
        expect(mokedSchema.validate.mock.calls.length).toBe(1);
    });
});
