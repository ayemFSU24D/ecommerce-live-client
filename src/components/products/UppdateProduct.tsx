
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import {  ProductExt } from "../../models/products/Product";
import { getProductById, uppdateProduct} from "../../services/ShopService";




export const UppdateProduct=()=>{
    const {id}= useParams();
    
    
    const navigate=useNavigate()
    const [product, setProduct]=useState<ProductExt>(new ProductExt(0, "","",0,0,"","",0));
    
    
    useEffect(() => {
      if (id) {
        // Om id är definierat, gör anropet
        const handleGetProductById= async()=>{
          
          const data = await getProductById(id);
          console.log(data)
          setProduct(data);
          localStorage.setItem("product", JSON.stringify(data));
        }
        handleGetProductById();
      }
    }, [id]);
    /* const getProduct= async(id:string)=>{
      const data = await getProductById(id);
      } */
     
     
     const handleSubmit=async(e:FormEvent)=>{
       e.preventDefault()
       if (!id || !product) return;
       if (id) {
         console.log(id);
         
          await uppdateProduct(Number(id),product);
             
        }
          /*   setProduct({
                id:"",
                name: "",
                description: "",
                price: 0,
                stock: 0,
                category: "",
                image: "",
                created_at:0
              }); */
              navigate("/admin/products")

        };

        const handleInputs=(e:ChangeEvent<HTMLInputElement>)=>{
            if (e.target.type === "text") {
                setProduct( { ...product,[e.target.name]: e.target.value } );
              }
            if (e.target.type === "number") {
                setProduct( { ...product,[e.target.name]: +e.target.value } );
              }
        }

    return<>Uppdate product {id}
    <form  onSubmit={handleSubmit}>

			<label htmlFor="name">Name</label>
			<input type="text" onChange={handleInputs} value={product.name} name="name"/>

			<label htmlFor="description">Description</label>
			<input type="text" onChange={handleInputs} value={product.description} name="description"/>

			<label htmlFor="price">Price</label>
			<input type="number"  onChange={handleInputs} value={product.price} name="price"/>

			<label htmlFor="stock">Stock</label>
			<input type="number" onChange={handleInputs} value={product.stock} name="stock" />

			<label htmlFor="category" >Category</label>
			<input type="text" onChange={handleInputs} value={product.category} name="category"/>

			<label htmlFor="image" >Image</label>
			<input type="text"onChange={handleInputs} value={product.image} name="image" />

			<button>Spara</button>
		</form>
    </>
}