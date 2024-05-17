import { SubscriptionInterval } from "ordercloud-javascript-sdk";

export type customOrderStatus =
  | "NotStarted"
  | "InProgress"
  | "Picked"
  | "OnHold"
  | "Completed"
  | "Cancelled";

export type OrderXp = {
  Status: undefined | customOrderStatus;
  Assignment:
    | undefined
    | null
    | {
        AssignedTo: string | null;
        FullName: string;
      };
  Notes?: Array<string> | undefined;
  FulfillmentType: undefined | FulfillmentTypes;
  Delivery: undefined | DeliveryTypes;
  Subscription?: {
    Id: string;
    Frequency: number;
    Interval: SubscriptionInterval;
    Active: boolean;
  } | null;
};

export type ShippingXp = {};

export type MeXp = {
  avatar: string;
  subscriptionStores?: Array<string> | null;
  upcomingTimeSpan?: string | null;
  upcomingView?:string|null;
};

export type LineItemXp = {
  Picked: undefined | boolean;
};

export type PaymentXp = {
  PO: undefined | string;
};

export type VariantXp = {
  Images: Array<string>;
  Thumbnails: Array<string>;
  Sizes: Array<string>;
  Colors: Array<string>;
  Tags: Array<string>;
  Suggestions: Array<string>;
  Brand: string;
  Availability: string;
  DiscountPercentage: number;
  StyleNumber: string;
  Details: string;
  Activities: Array<string>;
  AgeGroup: Array<string>;
  Gender: Array<string>;
  SimilarItems: Array<string>;
  TypesOfUse: Array<string>;
  Room: Array<string>;
  GiftFinder: {
    Occaision: Array<string>;
    Personality: Array<string>;
    Recipient: Array<string>;
  };
  LongDescription: string | null;
  IsDiscounted: "No" | "Yes";
};

export type SubscriptionXp = {
  Orders: Array<string>;
};

export type FulfillmentTypes = "PickUp" | "Delivery";
export type DeliveryTypes = "OutForDelivery" | "Delivered";