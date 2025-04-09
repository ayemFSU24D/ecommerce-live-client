import { useSearchParams } from "react-router"

export const OrderConfirmation=()=>{
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id")

    return<><h2>
        Order Sucess  
        </h2>
        <p>
        {sessionId}
        </p>
    </>
}