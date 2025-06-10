import { describe, expect, test, vi } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { generateAccessToken } from "../../src/utils/auth.util";

vi.mock("../../src/models/user.model", () => {
  return {
    UserModel: {
      getAll: vi.fn(async () => [
        { id: 1, name: "Test User", email: "test@test.com" },
      ]),
    },
  };
});

const token = generateAccessToken("test@test.com", "123");

describe("/users", () => {
  test("GET debería devolver los usuarios", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });
});
