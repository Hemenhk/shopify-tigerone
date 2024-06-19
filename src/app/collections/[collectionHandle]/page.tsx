import TheCollectionPage from "@/components/collections/TheCollectionPage";
import { getCollectionByHandle } from "@/graphql/queries/collections";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { collectionHandle: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const collectionHandle = params.collectionHandle;

  const product = await getCollectionByHandle(collectionHandle);

  return {
    title: product?.data?.collectionByHandle?.title,
    description: "collection's page",
  };
}

export default function CollectionByHandlePage({
  params,
}: {
  params: { collectionHandle: string };
}) {
  const { collectionHandle } = params;

  return (
    <>
      <TheCollectionPage collectionHandle={collectionHandle} />
    </>
  );
}
