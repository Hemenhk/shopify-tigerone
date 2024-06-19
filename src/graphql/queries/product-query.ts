import { client } from "@/shopify-client";

const productQuery = `
query ProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    description
    descriptionHtml
    variants(first: 10) {
      nodes {
        availableForSale
        id
        title
      }
    }
    images(first: 4) {
      nodes {
        altText
        id
        transformedSrc(preferredContentType: PNG)
      }
    }
   compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
    title
  }
}
`;

export const getProductByHandle = async (handle: string) => {
  try {
    const res = await client.request(productQuery, {
      variables: { handle },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
