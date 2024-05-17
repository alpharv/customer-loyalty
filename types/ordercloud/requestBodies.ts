import { Variant, Product, Spec } from "ordercloud-javascript-sdk";
import { LineItemXp, SubscriptionXp, VariantXp } from "./xp";

export type orderCloudSubscription = baseOrderCloud & {
    Request: {
    Body: subscriptionBodyBase;
    };
    Response: {
    Body: subscriptionBodyBase & {
        BillingAddressID: string;
        ShippingAddressID: string;
    };
    };
};

export type orderCloudSubscriptionItem = baseOrderCloud & {
    Request: {};
    Response: {
    Body: {
        ID: string;
        ProductID: string;
        Quantity: number;
        DateAdded: Date;
        QuantityShipped: number;
        UnitPrice: number;
        PromotionDiscount: number;
        LineTotal: number;
        LineSubtotal: number;
        CostCenter: string | null;
        DateNeeded: Date | null;
        ShippingAccount: null;
        ShippingAddressID: string | null;
        ShipFromAddressID: string | null;
        Product: Product<any>;
        Variant: Variant<VariantXp>|null;
        SupplierID: string;
        PriceScheduleID: string;
        PriceOverridden: boolean;
        Specs: Array<Spec>;
        xp: LineItemXp;
    };
    };
};

export type baseOrderCloud = {
    Route: string;
    RouteParams: {
        subscriptionID?: string | null;
        subscriptionItemID?: string | null;
    };
    Verb: "PATCH" | "POST" | "DELETE" | "PUT" | "POST";
};

type subscriptionBodyBase = {
    ID: string;
    Frequency: 4;
    Interval: "Months" | "Weeks" | "Days";
    EndDate: string | null;
    NextOrderDate: string | null;
    LastOrderDate: string | null;
    NotificationDate: Date;
    Active: boolean;
    FromCompanyID: string;
    FromUserID: string;
    ToCompanyID: string;
    xp: SubscriptionXp;
    payment: any;
};