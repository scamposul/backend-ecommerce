const supertest = require("supertest");
const { app, server } = require("../app");
const Users = require("../models/users.model");
const db = require("../utils/database");

const api = supertest(app);
const token =
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2VsbW9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbnNlbG1vIiwicGFzc3dvcmQiOiIkMmIkMDgkNEhsaG5SWlVydzBwQU1yRHgwWTJ5LlB4b1hiU1hybUtsRHVSN2tuLmp6OXhqYlFubzNoZzYiLCJpZCI6MSwiaWF0IjoxNjY5OTEwMDYwLCJleHAiOjE2Njk5MTM2NjB9.h2n5kX7zRP4bJye85Oc5oFyQemq4bNqD-mWdttcotkff2vTzm-npaeCuZLp2bRzl6B2yauxBUjQJO7U93Ubxbg";

describe("Pruebas del endpoint /users", () => {
  const newUser = {
    username: "nemesio",
    email: "nemesio@gmail.com",
    password: "1234",
  };
  test("Probar que un post a /users crea un nuevo usuario", async () => {
    await api
      .post("/api/v1/users")
      .set({ Authorization: token })
      .send(newUser)
      .expect(201);
      Users.destroy({where: {email: newUser.email}});
  });
  test("Comprobar la información del usuario creado", async () => {
    const {body} = await api.post("/api/v1/users").set({ Authorization: token }).send(newUser);
    expect(body.email).toEqual(newUser.email);
  });
});

afterAll(async () => {
  await Users.destroy({
    where: {
      username: "nemesio",
    },
  });
  server.close();
  db.close();
});