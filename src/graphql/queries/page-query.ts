import { client } from "@/shopify-client";

const pagesQuery = `
query PagesQuery {
  pages(first: 10) {
    nodes {
      handle
      id
      title
      onlineStoreUrl
    }
  }
}
`;

const pageByHandleQuery = `
query PageQuery($handle: String!) {
    page(handle: $handle) {
      body
      handle
      id
      onlineStoreUrl
      bodySummary
      title
    }
  }
`;

export const getPages = async () => {
  try {
    const res = await client.request(pagesQuery);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPageByHandle = async (handle: string) => {
  try {
    const res = await client.request(pageByHandleQuery, {
      variables: { handle },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
