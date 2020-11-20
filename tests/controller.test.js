const controller = require("../app/controllers/controller");
const validator = require("../app/validations/validator");
jest.mock("../app/validations/validator");
const { StatusCodes } = require("http-status-codes");

describe("controller:validate", () => {
    it("should be a function", () => {
        expect(controller.validate).toBeInstanceOf(Function);
    });
    it("should validate joySchema with the given data", () => {
        validator.validate = jest.fn();
        const mokedJoySchema = { validate: jest.fn() };
        const data = {};

        controller.validate(data, mokedJoySchema);

        expect(validator.validate.mock.calls.length).toBe(1);
        expect(validator.validate.mock.calls[0][0]).toMatchObject(
            mokedJoySchema
        );

        expect(validator.validate.mock.calls.length).toBe(1);
        expect(validator.validate.mock.calls[0][1]).toMatchObject(data);
    });
    it("should return response if validation fails", () => {
        validator.validate.mockImplementationOnce(() => {
            throw {
                message: "Error",
            };
        });
        const json = jest.fn();
        const res = {
            status: jest.fn().mockImplementationOnce(() => {
                return {
                    json,
                };
            }),
        };

        controller.validate({}, {}, res);

        expect(res.status.mock.calls.length).toBe(1);
        expect(res.status.mock.calls[0][0]).toEqual(
            StatusCodes.UNPROCESSABLE_ENTITY
        );

        expect(json.mock.calls.length).toBe(1);
        expect(json.mock.calls[0][0]).toMatchObject({
            message: "Error",
        });
    });
});
