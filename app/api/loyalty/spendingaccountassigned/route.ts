import { VerifyRequest } from "@/lib/cryptoHelper";
import { webhookSpendingAccountAssigned } from "@/types/ordercloud/requestBodies";
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
        return Response.json(JSON.parse('{"result":"Unauthorized (spendingaccountcreate)"}'), { status: 401 })
    }

    const webhookRequest = request.body as unknown as webhookSpendingAccountAssigned;
    switch (webhookRequest.Verb) {
    case "POST": 
        if (process.env.REACT_APP_LOGGING === "true") {
            console.log('Spending account assigned: SpendingAccountID=' + webhookRequest.Request.Body.SpendingAccountID + ' | UserID=' + webhookRequest.Request.Body.UserID);
        }
        // TODO: Add logic here - send message to user that they enrolled in the Loyalty Program.
    break;

    default:
        return Response.json(JSON.parse('{"result":"Default! OK! (spendingaccountcreate)"}'), { status: 200 })
    }  
}
