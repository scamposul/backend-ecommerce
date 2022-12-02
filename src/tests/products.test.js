const supertest = require("supertest");
const { app, server } = require("../app");
const db = require("../utils/database");
const Products = require("../models/products.model");
const inCart = require("../models/inCart.model");
const Cart = require("../models/cart.model");

const api = supertest(app);
const token =
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2VsbW9AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbnNlbG1vIiwicGFzc3dvcmQiOiIkMmIkMDgkNEhsaG5SWlVydzBwQU1yRHgwWTJ5LlB4b1hiU1hybUtsRHVSN2tuLmp6OXhqYlFubzNoZzYiLCJpZCI6MSwiaWF0IjoxNjY5OTEwMDYwLCJleHAiOjE2Njk5MTM2NjB9.h2n5kX7zRP4bJye85Oc5oFyQemq4bNqD-mWdttcotkff2vTzm-npaeCuZLp2bRzl6B2yauxBUjQJO7U93Ubxbg";

describe("Pruebas para el endpoint de products", () => {
  test("Probar que un get a products retorna un json", async () => {
    await api
      .get("/api/v1/products")
      .expect(200)
      .set({ Authorization: token })
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
    await Products.destroy({ where: {
      name: "Silo en bulto X 25 kg"
  }});
  });
  test("Comprobar la información del producto creado", async () => {
    let postBody = [];
    const {body} = await api.post("/api/v1/products").set({ Authorization: token }).send(testProduct);
    postBody.push(body);
    const products = postBody.filter((product) => testProduct.name === product.name);
    expect(products[0]).toMatchObject(testProduct);
    await Products.destroy({ where: {
      name: "Silo en bulto X 25 kg"
  }});
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
    cart_id: 2,
    quantity: 1,
    user_id: 1,
    price: "5.00"
};
describe("Pruebas para el endpoint de /products/:cart_id", () => {
    test("Probar que un post a /products/2 agrega un producto al carro", async () => {
        await api.post("/api/v1/products/2").set({ Authorization: token }).send(productCart).expect(201);
        await Cart.destroy({where: {id: productCart.cart_id}});
        await inCart.destroy({where: {cart_id: productCart.cart_id}});
    });
    test("Comprobar la información del producto agregado", async () => {
      let postBody = [];
      const {body} = await api.post("/api/v1/products/2").set({ Authorization: token }).send(productCart);
      postBody.push(body);
      const products = postBody.filter((product) => productCart.product_id === product.addProduct.product_id);
      expect(products[0].addProduct.product_id).toEqual(productCart.product_id);
      await Cart.destroy({where: {id: productCart.cart_id}});
      await inCart.destroy({where: {cart_id: productCart.cart_id}});
    });
})

afterAll(() => {
  server.close();
  db.close();
});

// const productCart = {
//   product_id: 1,
//   cart_id: 2,
//   quantity: 1,
//   user_id: 1,
//   price: "5.00",
// }
// const addProduct = async () => {
//   let postBody = [];
//   const {body} = await api.post("/api/v1/products/2").set({ Authorization: token }).send(productCart);
//   postBody.push(body);
//   const products = postBody.filter((product) => productCart.product_id === product.addProduct.product_id);
//   console.log(products[0].addProduct);
// };

// addProduct();
