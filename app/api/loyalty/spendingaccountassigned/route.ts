import { VerifyRequest } from "@/lib/cryptoHelper";
import { baseOrderCloud } from "@/types/ordercloud/requestBodies";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    if (process.env.REACT_APP_LOGGING === "true") {
        console.log(request.headers);   
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

    const webhookRequest = request.body as unknown as baseOrderCloud;
    switch (webhookRequest.Verb) {
    //case "XXXXX": TODO
    //    break;

    default:
        return Response.json(JSON.parse('{"result":"Default! OK! (spendingaccountcreate)"}'), { status: 200 })
    }  
}
