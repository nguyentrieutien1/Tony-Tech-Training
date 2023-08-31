import { WithCartProductsContext } from "@/HOCs/withProductCartContext";
import { ProductDTO } from "@/types/products.type";
import React from "react";
import ProductListComponent from "../ProductList";
import { CartProductsContextType } from "@/types/productCartContextType.type";

function ProductComponent(props: CartProductsContextType) {
  const { products } = props;

  return (
    <div>
      <div className="trending___product--container padding__content">
        <div className="trending___product--content">
          <div className="trending__product--title">
            <div>TOP TRENDING PRODUCTS</div>
            <span>Go To Trending Products</span>
          </div>
          <div className="trending__product--items">
            {/* <h3 style={{ textAlign: "center", width: "100%" }}>
                Loading Products . . .
              </h3> */}
            {products.length > 0 ? (
              products.map((product: ProductDTO) => (
                <ProductListComponent
                  key={product?._id}
                  _id={product?._id}
                  image={product?.image}
                  product_name={product?.product_name}
                  product_price={product?.product_price}
                  product_title={product?.product_title}
                />
              ))
            ) : (
              <h3 style={{ textAlign: "center", width: "100%" }}>
                Loading Products . . .
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default WithCartProductsContext(ProductComponent);
