const fs = require("fs");
const { cartdbPath, productdbPath } = require("./db_path");
function saveCartDbData(data) {
  fs.writeFileSync(cartdbPath, JSON.stringify(data, null, 2));
}
function saveProductDbData(data) {
  fs.writeFileSync(productdbPath, JSON.stringify(data, null, 2));
}
module.exports = {
  saveCartDbData,
  saveProductDbData
};