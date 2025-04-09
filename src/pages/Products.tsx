import "./../Styles/Products.css";
import { useEffect, useState } from "react";
import { Product, ProductExt } from "../models/products/Product";
import { AddProducts } from "../components/products/AddProducts";
import { ShowProducts } from "../components/products/ShowProducts";

import { createProduct, deleteProduct, getProducts } from "../services/ShopService";
import { Outlet } from "react-router";


export const Products = () => {
    
    const [products, setProducts]=useState<ProductExt[]>(
        JSON.parse(localStorage.getItem("products")||"[]"))
    ;
   
    
    /* const { fetchData, data, loading, error } = useFetch() */
 
    
    const addProduct = async(newProduct: Product) => {
     await createProduct(newProduct);
     const data = await getProducts();
            setProducts(data);
        }
        
        
        useEffect(() => {
            
            const handleGetProducts = async () => {
          if (products.length === 0) {
              const data = await getProducts();
              console.log(data);
            setProducts(data);
              localStorage.setItem("products", JSON.stringify(data));
            }
        };
      
        handleGetProducts(); // Hämta produkterna bara en gång
    }, []); // 🔥 Tom beroendearray → körs bara en gång vid mount
    
    
    
    
    
    const handleDeleteProduct=async (id:number)=>{
        await deleteProduct(id);
        const data = await getProducts();
        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data));

        }
        
        
        return <>
        <div>

    <AddProducts addProduct={addProduct} />
    <div className="style-uppdate-page" >  {/* div-för att kunna flexa innehollet */}
    <ShowProducts products={products} handleDeleteProduct={handleDeleteProduct}  />
        <div>
        {/* <Outlet context={{ handleUppdateProduct }} /> */}
        <Outlet  />
        </div>
    </div>
        </div>
    </>
}
        
                /*---------Fungerande lösning med Hooks--------------------
                const url = "http://localhost:3000/products";
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newProduct) }
                    await fetchData<string>(url,options)
                    
                };
                
                const getData=()=>{
                    setProducts(data)
                */