const products = [
  { id: 1, product_name: "NTT", price: 10 },
  { id: 2, product_name: "SH", price: 20 },
  { id: 3, product_name: "SH1", price: 30 },
  { id: 4, product_name: "SH2", price: 40 },
];
let cart = [
  {
    productId: 1,
    quantity: 2,
  },
  {
    productId: 3,
    quantity: 10,
  },
];
let total = 0;
cart = cart.reduce((previousValue, currentValue) => {
  const index = products.findIndex(
    (productItem) => productItem.id === currentValue.productId
  );
  previousValue += products[index].price * currentValue.quantity;
  return previousValue;
}, 0);
console.log(cart);
