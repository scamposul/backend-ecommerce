const express = require("express");
const db = require("./utils/database");
const morgan = require("morgan");
const cors = require("cors");
const handleError = require("./middlewares/error.middleware");
const initModels = require("./models/initModels");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const swaggerDocs = require("../swagger");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

db.authenticate()
  .then(() => console.log("Authentication successful"))
  .catch((error) => console.log(error));
db.sync({ force: false })
  .then(() => console.log("Database synchronized"))
  .catch((error) => console.log(error));

initModels();

app.get("/", (req, res) => {
  console.log("Todo copas");
});

const server = app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
  swaggerDocs(app, PORT);
});

app.use("/api/v1", usersRoutes, authRoutes, productsRoutes, orderRoutes);

app.use(handleError);

module.exports = {app, server};
