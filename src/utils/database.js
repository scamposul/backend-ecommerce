const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  database: process.env.DB_NAME || "ecommerceapi",
  username: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || 5432,
  password: process.env.DB_PASSWORD || 1234,
  dialect: "postgres",
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

module.exports = db;
