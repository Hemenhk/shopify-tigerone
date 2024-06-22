import { client } from "@/shopify-client";

const featuredCollection = `
query FeaturedCollection($id: ID!) {
  collection(id: $id) {
    id
    title
    products(first: 4) {
      nodes {
        featuredImage {
          altText
          transformedSrc(preferredContentType: PNG)
        }
        handle
        vendor
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
        id
        title
      }
    }}
}

`;

export const getFeaturedCollection = async (id: string) => {
  try {
    const res = await client.request(featuredCollection, {
      variables: { id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
