const fs = require("fs");
const { cartdbPath, productdbPath } = require("../helpers/db_path");
function checkDbFile(req, res, next) {
  if (!fs.existsSync(cartdbPath)) {
    fs.writeFileSync(cartdbPath, JSON.stringify({ cart: [] }));
    console.log("Created new db.json file.");
  }
  if (!fs.existsSync(productdbPath)) {
    fs.writeFileSync(productdbPath, JSON.stringify({ products: [] }));
    console.log("Created new db.json file.");
  }
  next();
}
module.exports = {
  checkDbFile,
};