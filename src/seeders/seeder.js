const initModels = require("../models/initModels");
const Products = require("../models/products.model");
const Users = require("../models/users.model");
const db = require("../utils/database");

initModels();

const users = [
    {username: 'anselmo', email: 'anselmo@gmail.com', password: '1234'}
];

const products = [
    {name: "Garlancha redonda", price: "5.00", availableQty: 10, user_id: 1},
    {name: "Úrea granulada", price: "25.00", availableQty: 22, user_id: 1},
    {name: "Cabuya X 50m", price: "3.30", availableQty: 54, user_id: 1},
    {name: "Bomba ariete", price: "269.99", availableQty: 49, user_id: 1},
    {name: "Cuajo líquido", price: "7.99", availableQty: 25, user_id: 1}
];

db.sync({ force: true }).then(() => {
    console.log("Seeding...");
    users.forEach(async (user) => await Users.create(user));
    setTimeout(() => {
        products.forEach(async (product) => await Products.create(product));
    }, 100)
});