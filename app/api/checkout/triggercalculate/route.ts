import { orderCloudLogin } from "@/lib/serverside";
import { NextRequest } from "next/server";
import { IntegrationEvents } from "ordercloud-javascript-sdk";

export async function GET(request: NextRequest) {

    const accessToken = await orderCloudLogin();
    const url = new URL(request.url);
    const orderId = url.searchParams.get('orderid') as string;
    
    if (process.env.REACT_APP_LOGGING === "true") {
        console.log("accessToken: " + accessToken);   
        console.log("orderId: " + orderId);      
    }

    const recalculate = await IntegrationEvents.Calculate("All", orderId, {
        accessToken: accessToken,
      }).catch((error)=>{console.log(error)});

    return Response.json(JSON.parse('{"result":"Trigger Calculate Done"}'), { status: 200 }) 
}
