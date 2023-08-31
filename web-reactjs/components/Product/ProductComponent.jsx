import React, { useContext } from "react";
import ProductListComponent from "../ProductList/ProductListComponent";
import { HomeContext } from "../../pages/index";
export default function ProductComponent() {
  const { products } = useContext(HomeContext);
  return (
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
            products.map((product) => (
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
  );
}
