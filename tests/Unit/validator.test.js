const validator = require("../../app/validations/validator");
const Joi = require("joi");

const getJoiSchema = () => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    return schema;
};

describe("validate", () => {
    it("should be a function", () => {
        expect(validator.validate).toBeInstanceOf(Function);
    });

    it("should execute method validateAsync of the joy schema param with the received data", async () => {
        const data = {};
        const mokedSchema = { validateAsync: jest.fn() };
        await validator.validate(data, mokedSchema);
        expect(mokedSchema.validateAsync.mock.calls.length).toBe(1);
        expect(mokedSchema.validateAsync.mock.calls[0][0]).toMatchObject(data);
    });

    it("should throw an error when validation fails", async () => {
        const data = {};
        const mokedSchema = getJoiSchema();
        try {
            await validator.validate(data, mokedSchema);
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
