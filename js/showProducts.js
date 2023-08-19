import { products } from "../data/products.js";
import { handleAddToCart } from "./addToCart.js";
import { showQuantityProduct } from "./showQuantityProduct.js";
console.log(products);
const items = document.querySelector(".trending__product--items");
export const showAllProducts = () => {
  const mapProducts = products.map((product, index) => {
    return `<div class="deal__product--item toptreding__product--item">
							<i class="fa-solid fa-spinner fa-spin ${`fa-spin-${index}`}"></i>
							<div class="deal__product--item-img">
							<img src="${product.image}" class="img-1" alt="Image">
								<img src="${product.image}" class="img-2  alt="Image">
								<img src="${product.image}" class="img-3 img-item-${index}" alt="Image">
							</div>
							<div class="deal__product--item-list--icon">
								<i class="fa-regular fa-heart">
									<h4 class="sub-icon">Quick view</h4>
								</i>
								<i class="fa-regular fa-eye">
									<h4 class="sub-icon">Quick view</h4>
								</i>
								<i class="fa-solid fa-rotate-left">
									<h4 class="sub-icon">Quick view</h4>
								</i>
							</div>
							<div class="deal__product--meta">
								<div class="deal__product--item-des">
									<div>${product.product_title}</div>
								</div>
								<div class="deal__product--item-name">
									<div>${product.product_title}</div>
								</div>
								<div class="deal__product--item-start">
									<i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
										class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i
										class="fa-regular fa-star"></i>
								</div>
								<div class="deal__product--item-price-2">
									<div>$ ${product.product_price}</div>
									<i class="fa-solid fa-cart-shopping shopping-btn" data-id="${product.id}"></i>
								</div>
							</div>
						</div>`;
  });
  items.innerHTML = mapProducts.join(" ");
  handleAddToCart();
  showQuantityProduct();
};
