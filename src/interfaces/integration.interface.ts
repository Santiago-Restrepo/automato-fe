export enum ClientKeys {
  Shopify = "Shopify",
  GoogleSheets = "GoogleSheets",
  Stripe = "Stripe",
}

export interface Integration {
  readonly id: number;
  name: ClientKeys;
}
