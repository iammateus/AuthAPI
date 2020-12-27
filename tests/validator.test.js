const validator = require("../app/validations/validator");
const Joi = require("joi");

const getJoiSchema = () => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema;
};

describe("validator:validate", () => {
    /* it("should be a function", () => {
        expect(validator.validate).toBeInstanceOf(Function);
    });
    it("should execute joy schema param's validation", async () => {
        const mokedSchema = { validateAsync: jest.fn() };
        await validator.validate(mokedSchema);
        expect(mokedSchema.validateAsync.mock.calls.length).toBe(1);
    }); */
    it("should throw error when validation fails", async () => {
        const data = {};
        const mokedSchema = getJoiSchema();
        try {
            await validator.validate(mokedSchema, data);
        } catch (error) {
            expect(error).toMatchObject({
                message: '"name" is required',
                path: ["name"],
                type: "any.required",
                context: { label: "name", key: "name" },
            });
        }
    });
});
