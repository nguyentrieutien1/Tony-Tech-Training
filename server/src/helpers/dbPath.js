const path = require("path")
const cartdbPath = path.join(__dirname, "../database/cart.json");
const productdbPath = path.join(__dirname, "../database/products.json");
module.exports = { cartdbPath, productdbPath };