import ThePage from "@/components/pages/ThePage";
import { getPageByHandle } from "@/graphql/queries/page-query";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { pageHandle: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const pageHandle = params.pageHandle;

  const page = await getPageByHandle(pageHandle);

  return {
    title: page?.data?.page?.title,
    description: page?.data?.page?.bodySummary,
  };
}

export default function PageHandle({
  params,
}: {
  params: { pageHandle: string };
}) {
  const { pageHandle } = params;

  return (
    <>
      <ThePage pageHandle={pageHandle} />
    </>
  );
}
