import { CartProductsContext } from "@/contexts/CartProductContext";
const WithCartProductsContext = (WrappedComponent: any) => {
  return (props: any) => {
    return (
      <CartProductsContext.Consumer>
        {(contextValue: any) => {
          return <WrappedComponent {...props} {...contextValue} />;
        }}
      </CartProductsContext.Consumer>
    );
  };
};
export { WithCartProductsContext };
