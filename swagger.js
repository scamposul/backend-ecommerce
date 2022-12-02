const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "El Charco de la Pava",
      version: "1.0.0",
      description: "eCommerce de agroinsumos y herramientas",
    },
  },
  apis: [
    "./src/routes/users.routes.js",
    "./src/models/users.model.js",
    "./src/routes/product.routes.js",
    "./src/models/products.model.js",
    "./src/routes/order.routes.js",
    "./src/models/order.model.js",
    "./src/routes/auth.routes.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("ContentType", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Documentación disponible en https://bscampoecommerce.up.railway.app:${port}/api/v1/docs`
  );
};

module.exports = swaggerDocs;
