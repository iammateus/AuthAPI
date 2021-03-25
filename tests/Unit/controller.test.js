const controller = require("../../app/controllers/controller");
const validator = require("../../app/validations/validator");
jest.mock("../../app/validations/validator");
const { StatusCodes } = require("http-status-codes");

describe("validate", () => {
    it("should be a function", () => {
        expect(controller.validate).toBeInstanceOf(Function);
    });

    it("should validate joySchema with the received data", () => {
        validator.validate = jest.fn();
        const data = {};
        const mokedJoySchema = { validateAsync: jest.fn() };

        controller.validate(data, mokedJoySchema);

        expect(validator.validate.mock.calls.length).toBe(1);
        expect(validator.validate.mock.calls[0][0]).toMatchObject(data);

        expect(validator.validate.mock.calls.length).toBe(1);
        expect(validator.validate.mock.calls[0][1]).toMatchObject(
            mokedJoySchema
        );
    });

    it("should send unprocessable entity response code and error object to res param when validation fails", async () => {
        const error = {
            message: "Error",
        };
        validator.validate.mockImplementationOnce(async () => {
            throw error;
        });
        const json = jest.fn();
        const res = {
            status: jest.fn().mockReturnValueOnce({ json }),
        };

        await controller.validate({}, {}, res);

        expect(res.status.mock.calls.length).toBe(1);
        expect(res.status.mock.calls[0][0]).toEqual(
            StatusCodes.UNPROCESSABLE_ENTITY
        );

        expect(json.mock.calls.length).toBe(1);
        expect(json.mock.calls[0][0]).toMatchObject(error);
    });
});
