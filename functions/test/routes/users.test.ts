import {describe, expect, test} from "@jest/globals";
import request from "supertest";
import app from "../../src/app"; // Import app from app.ts

describe("Users router", () => {
  test.only("GET /user/:wallet", async () => {
    const wallet = "0x6402fE3Af805FcEe00E9b4b635e689Dc0d1FFFbF".toLowerCase();
    const response = await request(app).get(`/users/${wallet}`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("POST /user", async () => {
    const userData = {
      // Your user data for testing
    };
    const response = await request(app).post("/user").send(userData);
    expect(response.status).toBe(201);
    // Add more assertions as needed
  });

  test("PUT /user/:user_id", async () => {
    const user_id = 1; // Use a valid user ID for testing
    const updateData = {
      // Your update data for testing
    };
    const response = await request(app).put(`/user/${user_id}`).send(updateData);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("DELETE /user/:user_id", async () => {
    const user_id = 1; // Use a valid user ID for testing
    const response = await request(app).delete(`/user/${user_id}`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("GET /user/:user_id/songs", async () => {
    const user_id = 1; // Use a valid user ID for testing
    const response = await request(app).get(`/user/${user_id}/songs`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test.only("GET /user/:user_id/likes", async () => {
    const user_id = 1; // Use a valid user ID for testing
    const response = await request(app).get(`/users/${user_id}/likes`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  test("GET /user/:user_id/events", async () => {
    const user_id = 1; // Use a valid user ID for testing
    const response = await request(app).get(`/user/${user_id}/events`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});
