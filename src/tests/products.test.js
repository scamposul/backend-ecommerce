const supertest = require("supertest");
const { app, server } = require("../app");
const db = require("../utils/database");
const Products = require("../models/products.model");

const api = supertest(app);
const token =
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2VsbW9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbnNlbG1vIiwicGFzc3dvcmQiOiIkMmIkMDgkNEhsaG5SWlVydzBwQU1yRHgwWTJ5LlB4b1hiU1hybUtsRHVSN2tuLmp6OXhqYlFubzNoZzYiLCJpZCI6MSwiaWF0IjoxNjY5OTEwMDYwLCJleHAiOjE2Njk5MTM2NjB9.h2n5kX7zRP4bJye85Oc5oFyQemq4bNqD-mWdttcotkff2vTzm-npaeCuZLp2bRzl6B2yauxBUjQJO7U93Ubxbg";

describe("Pruebas para el endpoint de products", () => {
  test("Probar que un get a products retorna un json", async () => {
    await api
      .get("/api/v1/products")
      .set({ Authorization: token })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a products retorna un arreglo", async () => {
    const { body } = await api
      .get("/api/v1/products")
      .set({ Authorization: token });
    expect(body).toBeInstanceOf(Array);
  });
  const testProduct = {
    name: "Silo en bulto X 25 kg",
    price: "15.00",
    availableQty: 12,
    user_id: 1
  }
  test("Probar que un post a products crea un nuevo producto", async () => {
    await api.post("/api/v1/products").set({ Authorization: token }).send(testProduct).expect(201);
  });
  test("Comprobar la información del producto creado", async () => {
    let postBody = [];
    const {body} = await api.post("/api/v1/products").set({ Authorization: token }).send(testProduct);
    postBody.push(body);
    const products = postBody.filter((product) => testProduct.name === product.name);
    expect(products[0]).toMatchObject(testProduct);
  });
});
describe("Pruebas para el endpoint de /products/:user_id/:cart_id", () => {
  test("Probar que un get a /products/1/1 retorna un json", async () => {
    await api
      .get("/api/v1/products/1/1")
      .set({ Authorization: token })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Probar que un get a /products/1/1 retorna un arreglo", async () => {
    const { body } = await api
      .get("/api/v1/products/1/1")
      .set({ Authorization: token });
    expect(body).toBeInstanceOf(Array);
  });
});
const productCart = {
    product_id: 1,
    cart_id: 1,
    quantity: 1,
    price: "5.00"
}
describe("Pruebas para el endpoint de /products/:cart_id", () => {
    test("Probar que un post a /products/1 agrega un producto al carro", async () => {
        await api.post("/api/v1/products/1").set({ Authorization: token }).send(productCart).expect(201);
    });
    test("Comprobar la información del producto agregado", async () => {
        let postBody = [];
        const {body} = await api.post("/api/v1/products/1").set({ Authorization: token }).send(productCart);
        postBody.push(body);
        const products = postBody.filter((product) => productCart.product_id === product.product_id);
        expect(products[0]).toMatchObject(productCart);
    });
})

afterAll(async () => {
    await Products.destroy({ where: {
        name: "Silo en bulto X 25 kg"
    }});
  server.close();
  db.close();
});
