import { createStorefrontApiClient } from "@shopify/storefront-api-client";

export const client = createStorefrontApiClient({
  storeDomain: "http://tigerone.store",
  apiVersion: "2024-04",
  publicAccessToken: process.env.PUBLIC_ACCESS_TOKEN,
});
