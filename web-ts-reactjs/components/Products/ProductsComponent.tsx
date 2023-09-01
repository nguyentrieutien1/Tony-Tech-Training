import { WithCartProductsContext } from "@/HOCs/withProductCartContext";
import { ProductDTO } from "@/types/products.type";
import React, { useState } from "react";
import ProductListComponent from "../ProducstList/ProductsListComponent";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import ProductDetailComponent from "../ProductsDetail/ProductDetailComponent";

function ProductComponents(props: CartProductsContextType) {
  const { products } = props;
  const [isShowProductDetail, setIsShowProductDetail] =
    useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const showModal = (_id: string) => {
    setProductId(_id);
    setIsShowProductDetail(true);
  };
  const closeModal = () => {
    setIsShowProductDetail(false);
  };
  return (
    <div>
      <ProductDetailComponent
        _id={productId}
        closeModal={closeModal}
        isShowProductDetail={isShowProductDetail}
      />
      <div className="trending___product--container padding__content">
        <div className="trending___product--content">
          <div className="trending__product--title">
            <div>TOP TRENDING PRODUCTS</div>
            <span>Go To Trending Products</span>
          </div>
          <div className="trending__product--items">
            {products.length > 0 ? (
              products.map((product: ProductDTO) => (
                <ProductListComponent
                  key={product?._id}
                  _id={product?._id}
                  image={product?.image}
                  product_name={product?.product_name}
                  product_price={product?.product_price}
                  product_title={product?.product_title}
                  showModal={showModal}
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
export default WithCartProductsContext(ProductComponents);
