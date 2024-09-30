import {
    ApiRole,
    Auth,
    Configuration,
    OrderCloudError,
} from "ordercloud-javascript-sdk";

import {isTokenExpired } from "./baseOrderCloud";

export const orderCloudLogin = async (accessToken?: string) =>
    new Promise(
    async (resolve: (token: string) => void, reject: (err: string) => void) => {
        if (!isTokenExpired(accessToken)) {
            resolve(accessToken);
            return;
        }

    const clientId = process.env.REACT_APP_BUYER_ID;
    const clientSecret = process.env.REACT_APP_BUYER_SECRET;
 
    Configuration.Set({
        baseApiUrl: process.env.REACT_APP_ORDERCLOUD_BASEURL,
        timeoutInMilliseconds: 20 * 1000,
    });

    Auth.ElevatedLogin(
        clientSecret,
        process.env.REACT_APP_USER_ID,
        process.env.REACT_APP_PASSWORD,
        clientId,
        process.env.REACT_APP_ROLES.split(",").map((f: ApiRole) => {
            return f;
        })
    )
    .then((response: any) => {
        const token = response.access_token;
        resolve(token);
    })
    .catch((err: OrderCloudError) => {
        if (process.env.REACT_APP_LOGGING === "true") {
            console.error(err);
        }
        reject(err.message);
    });
});

