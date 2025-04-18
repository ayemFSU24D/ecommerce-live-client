import { useEffect, useState } from "react";
import { useSearchParams } from "react-router"
import { getOrderListByPaymentId} from "../../services/ShopService";
import { OrderById } from "../../models/orders/OrderById";

export const OrderConfirmation=()=>{
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id")
    const [orderDetails, setOrderDetails]=useState<OrderById>()
    useEffect(() => {
        
        if (sessionId) {
                // Om id är definierat, gör anropet
                const handleOrederDetails= async()=>{
                  
                  const data:OrderById = await getOrderListByPaymentId(sessionId);
                  console.log(data)
                  setOrderDetails(data);
                 
                }
                handleOrederDetails();
              }


        // 🧹 Töm localStorage när komponenten mountas
        localStorage.clear();
      }, []);


    return<><h2>
        Order Sucess  
        </h2>
        <div>{orderDetails?.customer_firstname}</div>
        <div>{orderDetails?.customer_lastname}</div>
        <div>Leverans Adress: {orderDetails?.customer_city}</div>
        <div>{orderDetails?.customer_country}</div>
        <div>{orderDetails?.customer_email}</div>
        <p>
        {sessionId}
        </p>
        <div>{orderDetails?.total_price}</div>
        <div>{orderDetails?.order_items.map((i)=>{
            return<>

                <div>{i.product_name}</div>
                <div>{i.quantity}</div>
                <div>{i.quantity}</div>
                <img src="" alt="" />
            </>
            
        })};
            
        </div>
    </>
}