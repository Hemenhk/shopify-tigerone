"use client";

import { getPageByHandle } from "@/graphql/queries/page-query";
import { useQuery } from "@tanstack/react-query";

export default function ThePage({ pageHandle }: { pageHandle: string }) {
    
  const { data: pageData } = useQuery({
    queryKey: ["page"],
    queryFn: () => getPageByHandle(pageHandle),
  });

  const addBreaks = (htmlString: any) => {
    // Replace every opening <p> tag with <p><br>
    return htmlString.replace(/<\/p>/g, '</p><br>');
  };

  const processedBody = pageData?.data?.page?.body
    ? addBreaks(pageData.data.page.body)
    : "";

  console.log("page", pageData?.data.page);

  return (
    <div className="flex flex-col justify-center items-center mx-auto py-24 w-3/4 md:w-2/4">
      <h2 className="text-2xl uppercase tracking-wider pb-24">
        {pageData?.data.page.title}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: processedBody }} />
    </div>
  );
}
