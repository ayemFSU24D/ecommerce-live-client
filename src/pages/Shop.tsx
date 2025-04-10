import { useContext, useEffect, useState } from "react";
import { ProductExt } from "../models/products/Product";
import { CartACtionType } from "../redusers/CartReduser";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "../models/cart/Cartitem";
import { getProducts } from "../services/ShopService";


export const Shop = () => {
        const [products, setProducts]=useState<ProductExt[]>([])
        const {cart, cartDispatch} = useContext(CartContext);
        useEffect(() => {
          const fetchProducts = async () => {
            try {
              const productList: ProductExt[] = await getProducts();
              if(productList)
              setProducts(productList);
        
              // Om du vill spara dem lokalt
              // localStorage.setItem("products", JSON.stringify(productList));
            } catch (error) {
              console.error("Failed to fetch products:", error);
            }
          };
        
          fetchProducts();
        }, []);
        
    
        const handleAddToCart = (product: ProductExt, quantity: number) => {
            cartDispatch({
              type: CartACtionType.ADD_ITEM,
              payload: new CartItem(product, quantity)
            })
          }
    
            return<>{products.map((p)=>{
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