import { CartProductsContext } from "@/contexts/CartProductContext";
const withCartProductsContext = (WrappedComponent: any) => {
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
export { withCartProductsContext };
