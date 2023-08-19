import { products } from "../data/products.js";
import { cart } from "../global/state.js";
import { totalPrice } from "../helpers/total_price.helper.js";
import { toInt } from "../utils/coverToInt.js";

export const findProductById = (id) => {
  const find_product_by_id = products.find(
    (product) => toInt(product?.id) == toInt(id)
  );
  const find_quantity_by_id = cart?.find(
    (product) => toInt(product?.id) == toInt(id)
  );
  const quantities = cart?.reduce((prevItem, currentIem) => {
    prevItem += currentIem?.quantity;
    return prevItem;
  }, 0);
  const renderProduct = `
  <div class="modal__product">
						<img src="${find_product_by_id.image}" alt="">
						<div class="modal__product--p">
							<div class="modal__product--title">
								${find_product_by_id?.product_title}
							</div>
							<div class="modal__product--price">
								<span>$ ${find_product_by_id.product_price}</span> <span>Size: </span><b>S</b>
							</div>
							<div class="modal__product--quantity"><span>Quantity:</span><b>${
                find_quantity_by_id?.quantity
              }</b></div>
						</div>
						</div>
						<div class="modal__checkout">
						<div class="modal__checkout--quantity">
							There are ${quantities} items in your cart.
						</div>
						<div class="modal__checkout--total">
							Subtotal: $ ${totalPrice()}
						</div>
						<div class="modal__checkout--quantity">
							Shipping: $0.00
						</div>
						<div class="modal__checkout--tax">
							Total (tax excl.) $0.00
						</div>
						<div class="modal__checkout--tax">Total (tax excl.) $236.84
						</div>
						<div class="modal__checkout--taxes">
							Taxes: $0.00
						</div>
						<div class="modal__checkout--btn">
							<span>CONTINUE SHOPPING</span><span>
								<i class="fa-solid fa-check"></i>
								PROCCED TO CHECKOUT
							</span>
						</div>
					</div>
					`;
  return renderProduct;
};
