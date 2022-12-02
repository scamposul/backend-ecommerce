const supertest = require("supertest");
const { app, server } = require("../app");
const db = require("../utils/database");

const api = supertest(app);

describe("Pruebas para el endpoint /login", () => {
  const credentials = {
    username: "anselmo",
    password: "1234",
  };
  const fakeCredentials = {
    username: "macario",
    password: "4321",
  };
  test("Probar que un post a /login con credenciales correctas retorna un status 200", async () => {
    await api
      .post("/api/v1/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un post a /login con credenciales incorrectas retorna un status 400", async () => {
    await api.post("/api/v1/login").send(fakeCredentials).expect(400);
  });
});

afterAll(async () => {
  server.close();
  await db.close();
});



