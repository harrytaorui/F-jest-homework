import { register } from "../user";
import { verifyUsername } from "../verify";

jest.mock("../verify", () => ({
  verifyPassword: jest.fn(() => true),
  verifyUsername: jest.fn(() => true),
}));
jest.mock("axios");

beforeEach(() => {
  jest.resetModules();
});

describe("register", () => {
  test("should post user when validated", async () => {
    await expect(register("harry", "123")).resolves.toEqual({});
  });

  test("should reject with Error when username is invalid", async () => {
    verifyUsername.mockImplementation(() => false);
    await expect(register("harry", "123")).rejects.toThrow(Error);
  });
});
