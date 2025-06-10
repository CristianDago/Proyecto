import { describe, expect, test, vi } from "vitest";
import request from "supertest";
import app from "../../src/app";
import { generateAccessToken } from "../../src/utils/auth.util";

vi.mock("../../src/models/user.model", () => {
  return {
    UserModel: {
      findById: vi.fn(async (id: string) => {
        if (id === "1") {
          return { id: "1", name: "Test User", email: "test@test.com" };
        }
        return null;
      }),
    },
  };
});

const token = generateAccessToken("test@test.com", "123");

describe("/users/:id", () => {
  test("GET /users/:id debería devolver un usuario si el ID es válido", async () => {
    const response = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: "Test User",
      email: "test@test.com",
    });
  });

  test("GET /users/:id debería devolver 404 si el usuario no existe", async () => {
    const response = await request(app)
      .get("/users/999")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: "El ID de usuario no es válido",
    });
  });
});
