import React, { useState } from "react";
import { ProductsDTO } from "@/types/products.type";
import ProducItem from "../ProductItem/ProductItem";
import ProductDetail from "../ProductsDetail/ProductDetail";
import { CartProductsDTO } from "@/types/cart.type";
interface ProductsPropsType {
  products: ProductsDTO[];
  cart: CartProductsDTO[];
  create: (payload: CartProductsDTO) => Promise<void>;
  update: (_id: string, payload: CartProductsDTO) => Promise<void>;
}
function Product(props: ProductsPropsType) {
  // GET ALL PROPS
  const { products, cart, create, update } = props;
  const [isShowProductDetail, setIsShowProductDetail] =
    useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  // SHOW MODAL
  const showModal = (_id: string) => {
    setProductId(_id);
    setIsShowProductDetail(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setIsShowProductDetail(false);
  };
  return (
    <div>
      <ProductDetail
        cart={cart}
        _id={productId}
        isShowProductDetail={isShowProductDetail}
      />
      <div
        onClick={closeModal}
        className={`modal__body ${isShowProductDetail && "show__modal--body"}`}
      ></div>
      <div className="trending___product--container padding__content">
        <div className="trending___product--content">
          <div className="trending__product--title">
            <div>TOP TRENDING PRODUCTS</div>
            <span>Go To Trending Products</span>
          </div>
          <div className="trending__product--items">
            {products.length > 0 ? (
              products.map((product: ProductsDTO) => (
                <ProducItem
                  products={products}
                  key={product?._id}
                  _id={product?._id}
                  image={product?.image}
                  cart={cart}
                  product_name={product?.product_name}
                  product_price={product?.product_price}
                  product_title={product?.product_title}
                  showModal={showModal}
                  create={create}
                  update={update}
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
export default Product;
