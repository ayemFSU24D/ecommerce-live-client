import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { CartItem } from "../models/cart/Cartitem";
import { CartReducer, ICartAction } from "../redusers/CartReduser";



interface ICartContext{
    cart:CartItem[];
    cartDispatch:Dispatch<ICartAction>

}



export const CartContext=createContext<ICartContext>({
    cart:[],
    cartDispatch:()=>{
        return;
    }
})

export const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, cartDispatch] = useReducer(CartReducer, []);
  
    return (
      <CartContext.Provider value={{cart, cartDispatch}}>
        {/* // RouterProvider comes in here though children */}
        {children} 
      </CartContext.Provider>
    )
  }
