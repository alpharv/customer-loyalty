import { VerifyRequest } from "@/lib/cryptoHelper";
import { webhookSpendingAccountCreated } from "@/types/ordercloud/requestBodies";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    if (process.env.REACT_APP_LOGGING === "true") {
        console.log(request.body);   
    }
    var VerificationHeaderName = process.env.VERIFICATION_HEADER as string
    if (!VerifyRequest(
            JSON.stringify(request.body),
            request.headers.get(VerificationHeaderName) as string)  
    )
    {
        if (process.env.REACT_APP_LOGGING === "true") 
            console.log('Unauthorized');
        return Response.json(JSON.parse('{"result":"Unauthorized (spendingaccountassigned)"}'), { status: 401 })
    }

    const webhookRequest = request.body as unknown as webhookSpendingAccountCreated;
    switch (request.method) {
    case "POST": 
        if (process.env.REACT_APP_LOGGING === "true") {
            console.log('Spending account created: ID=' + webhookRequest.Response.Body.ID + ' | Name=' + webhookRequest.Response.Body.Name+ ' | Balance=' + webhookRequest.Response.Body.Balance);
        }
        // TODO: Add logic here - send message to user that they enrolled in the Loyalty Program.
    break; 

    default:
        if (process.env.REACT_APP_LOGGING === "true") {
            console.log('!!!!!Spending account created: ID=' + webhookRequest.Response.Body.ID + ' | Name=' + webhookRequest.Response.Body.Name+ ' | Balance=' + webhookRequest.Response.Body.Balance);
        }
        return Response.json(JSON.parse('{"result":"Default! OK! (spendingaccountassigned)"}'), { status: 200 })
    }  
}
