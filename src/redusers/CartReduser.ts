import { CartItem } from "../models/cart/Cartitem";

export interface ICartAction {
    type: CartACtionType;
    payload: CartItem | any;
  }
  
  
  export enum CartACtionType  {
    ADD_ITEM,
    REMOVE_ITEM,
    CHANGE_QUANTITY,
    RESET_CART
  }
  
  export const CartReducer = (cart: CartItem[], action: ICartAction) => {
    const { payload, type } = action;
  
    switch (type) {
      case CartACtionType.ADD_ITEM: {
        const itemExists = cart.find((item) => item.product.id === payload.product.id);
  
        const updatedCart = itemExists
          ? cart.map((item) =>
              item.product.id === payload.product.id
                ? { ...item, quantity: item.quantity + payload.quantity }
                : item
            )
          : [...cart, payload];
  
        // ✅ Spara till Local Storage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
  
      case CartACtionType.REMOVE_ITEM: {
        const updatedCart = cart.filter((item) => item.product.id !== payload.product.id);
  
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
  
      case CartACtionType.CHANGE_QUANTITY: {
        const updatedCart = cart.map((item) =>
          item.product.id === payload.product.id
            ? {
                ...item,
                quantity: Math.max(item.quantity + payload.quantity, 1), // 🛑 Minimum är 1
              }
            : item
        );
  
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
  
      case CartACtionType.RESET_CART: {
        localStorage.removeItem("cart");
        return [];
      }
  
      default:
        return cart;
    }
  };
  