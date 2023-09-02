import React, { Component, createContext } from "react";
import Products from "@/components/Products/Products";
import { ProductsDTO } from "@/types/products.type";
import { CartProductsContextType } from "@/types/productCartContextType.type";
import { withCartProductsContext } from "@/HOCs/withProductCartContext";
import { CartProductsContext } from "@/contexts/CartProductContext";
import { CartProductsDTO } from "@/types/cart.type";
export const ProductsContext = createContext([]);
interface ProductsState {
  products: ProductsDTO[];
}
class ProductsModule extends Component<CartProductsContextType, ProductsState> {
  static contextType = CartProductsContext;
  context!: React.ContextType<typeof CartProductsContext>;
  constructor(props: CartProductsContextType) {
    super(props);
    this.state = {
      products: [],
    };
  }
  // GET ALL PRODUCT
  getAllProduct = async () => {
    const { getAllProduct } = this.context;
    return await getAllProduct();
  };
  // ADD TO CART
  create = async (payload: CartProductsDTO) => {
    const { create } = this.context;
    await create(payload);
  };
  // UPDATE CART ITEM
  update = async (_id: string, payload: CartProductsDTO) => {
    const { update } = this.context;
    await update(_id, payload);
  };
  // CALL API TO GET ALL PRODUCTS
  componentDidMount(): void {
    const { setProducts } = this.context;
    this.getAllProduct().then((products: ProductsDTO[]) => {
      setProducts([...products]);
    });
  }
  render() {
    const { products, cart } = this.context;
    return (
      <Products
        products={products}
        cart={cart}
        create={this.create}
        update={this.update}
      />
    );
  }
}
export default withCartProductsContext(ProductsModule);
