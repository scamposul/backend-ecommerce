const supertest = require("supertest");
const { app, server } = require("../app");
const inOrder = require("../models/inOrder.model");
const Order = require("../models/order.model");
const db = require("../utils/database");

const api = supertest(app);
const token =
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2VsbW9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbnNlbG1vIiwicGFzc3dvcmQiOiIkMmIkMDgkNEhsaG5SWlVydzBwQU1yRHgwWTJ5LlB4b1hiU1hybUtsRHVSN2tuLmp6OXhqYlFubzNoZzYiLCJpZCI6MSwiaWF0IjoxNjY5OTEwMDYwLCJleHAiOjE2Njk5MTM2NjB9.h2n5kX7zRP4bJye85Oc5oFyQemq4bNqD-mWdttcotkff2vTzm-npaeCuZLp2bRzl6B2yauxBUjQJO7U93Ubxbg";

const newOrder = {
    totalPrice: "53.22",
    user_id: 1,
  };
describe("Pruebas para el endpoint de /order/:user_id", () => {
  test("Probar que un get a /order/1 retorna un json", async () => {
    await api
      .get("/api/v1/order/1")
      .set({ Authorization: token })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a /order/1 retorna un array", async () => {
    const { body } = await api
      .get("/api/v1/order/1")
      .set({ Authorization: token });
    expect(body).toBeInstanceOf(Array);
  });
});

describe("Pruebas para el endpoint de /order/:cart_id", () => {
  
  test("Probar que un post a /order/1 crea una nueva orden", async () => {
    const {body} = await api
      .post("/api/v1/order/1")
      .set({ Authorization: token })
      .send(newOrder)
      .expect(201);
    await inOrder.destroy({where: {order_id: body.createOrder.id}}).then(Order.destroy({where: {id: body.createOrder.id}}));
  });
  test("Comprobar la información de la orden creada", async () => {
    const {body} = await api.post("/api/v1/order/1").set({ Authorization: token }).send(newOrder);
    expect(body.createOrder.totalPrice).toEqual(newOrder.totalPrice);
    await inOrder.destroy({where: {order_id: body.createOrder.id}}).then(Order.destroy({where: {id: body.createOrder.id}}));
  })
});

afterAll(() => {
  server.close();
  db.close();
});

// const newOrder = {
//     totalPrice: "50.00",
//     user_id: 1,
//   };
// const createOrder = async () => {
//     const { body } = await api
//     .post("/api/v1/order/1")
//     .set({ Authorization: token })
//     .send(newOrder);
//     console.log(body.createOrder.id)
// };

// createOrder();