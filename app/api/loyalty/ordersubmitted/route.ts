import { VerifyRequest } from "@/lib/cryptoHelper";
import { orderCloudLogin } from "@/lib/serverside";
import { OrderRequest } from "@/types/ordercloud/requestBodies";
import { NextRequest, NextResponse } from "next/server";
import { OrderSubmitResponse, SpendingAccounts } from "ordercloud-javascript-sdk";

export async function POST(request: NextRequest) {
    if (process.env.REACT_APP_LOGGING === "true") {
        console.log(request.body);   
    }

    const orderRequest: OrderRequest = await request.json();

    var VerificationHeaderName = process.env.VERIFICATION_HEADER as string
    if (!VerifyRequest(
            JSON.stringify(request.body),
            request.headers.get(VerificationHeaderName) as string)  
    )
    {
        if (process.env.REACT_APP_LOGGING === "true") 
            console.log('Unauthorized');
        return Response.json(JSON.parse('{"result":"Unauthorized (ordersubmitted)"}'), { status: 401 })
    }

    switch (request.method) {
    case "POST": 
        if (process.env.REACT_APP_LOGGING === "true") {
            console.log('Order submitted:: ID=' + orderRequest.Response.Body.ID + ' | FromUserEmail=' + orderRequest.Response.Body.FromUser?.Email+ ' | Total=' + orderRequest.Response.Body.Total?.toString());
        }
        // Calculate the points earned and add it to the users Loyalty spending account
        var pointsEarned = Math.ceil(orderRequest.Response.Body.Total * 0.1);
        var username = orderRequest.Response.Body.FromUser?.Username;
        var spendingAccountId = process.env.REACT_APP_BUYERID + '-' + username;

        const accessToken = await orderCloudLogin();
        const spendingAccount = await SpendingAccounts.Get(process.env.REACT_APP_BUYERID,spendingAccountId,
            {
                accessToken: accessToken,
            }
        ).catch((error)=>{console.log(error)});
        console.log('spendingAccounts=' + spendingAccount);

        spendingAccount.Balance += pointsEarned; 
        console.log('Balance=' + spendingAccount.Balance);
        
        const spendingAccountUpdated = await SpendingAccounts.Patch(process.env.REACT_APP_BUYERID,spendingAccountId,  
            {
                Balance: spendingAccount.Balance,
            },
            {
                accessToken: accessToken,
            }
        ).catch((error)=>{console.log(error)});
    break; 

    default:
        if (process.env.REACT_APP_LOGGING === "true") {
            console.log('!!!!!Order submitted:: ID=' +orderRequest.Response.Body.ID + ' | FromUserEmail=' + orderRequest.Response.Body.FromUser?.Email+ ' | Total=' + orderRequest.Response.Body.Total?.toString());
        }
        return Response.json(JSON.parse('{"result":"Default! OK! (ordersubmitted)"}'), { status: 200 })
    }  

    const result: OrderSubmitResponse = {
        Succeeded: true,
        HttpStatusCode: 200,
    }
    
    return NextResponse.json(result);
}
