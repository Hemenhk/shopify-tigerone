import { client } from "@/shopify-client";

const getCollectionByHandleQuery = `
query CollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      handle
      id
      title
      products(first: 10) {
        nodes {
          featuredImage {
            transformedSrc(preferredContentType: PNG)
          }
          handle
          id
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
          title
          vendor
        }
      }
    }
  }
`;

export const getCollectionByHandle = async (handle: string) => {
  try {
    const res = await client.request(getCollectionByHandleQuery, {
      variables: { handle },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
