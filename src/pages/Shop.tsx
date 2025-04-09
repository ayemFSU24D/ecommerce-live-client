import { useContext } from "react";
import { ProductExt } from "../models/products/Product";
import { CartACtionType } from "../redusers/CartReduser";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "../models/cart/Cartitem";


export const Shop = () => {
    
        const { cartDispatch} = useContext(CartContext);
        const productList:ProductExt[] = JSON.parse(localStorage.getItem("products")||"[]")
        ;
    
        const handleAddToCart = (product: ProductExt, quantity: number) => {
            cartDispatch({
              type: CartACtionType.ADD_ITEM,
              payload: new CartItem(product, quantity)
            })
          }
    
            return<>{productList.map((p)=>{
                return <>
                <div key={p.id}>
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>{p.price}</p>
                    <p>{p.stock}</p>
                    <p>{p.category}</p>
                    <p>{p.created_at}</p>
                    <img src={p.image} alt="" style={{
                    maxWidth: "300px", // Maximal bredd på bilden
                    maxHeight: "300px", // Maximal höjd på bilden
                    objectFit: "contain"}}/>
                    <button onClick={() => handleAddToCart(p,1)}>Add to Cart</button>
               
                    
                </div>
                
                </>
            })}
            </>
}