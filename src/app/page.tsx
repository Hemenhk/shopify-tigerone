"use client";
import TheFeaturedCollection from "@/components/featured-collection/TheFeaturedCollection";
import TheHeroBanner from "@/components/homepage/TheHeroBanner";
import ThePerks from "@/components/homepage/ThePerks";
import { getVideoInfo } from "@/graphql/queries/shop-query";
import { useShopQuery } from "@/hooks/useQueryHooks";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: shopData } = useShopQuery();
  const homeImage = shopData?.data.shop.brand.coverImage.image;
  console.log("home image", homeImage);

  const { data: videoData } = useQuery({
    queryKey: ["video"],
    queryFn: () =>
      getVideoInfo("homepage_video.home_page_video", "Homepage video"),
  });

  console.log("video", videoData);

  return (
    <main className="flex h-full flex-col items-center justify-between">
      <div>
        <img
          className="h-[78vh] w-screen brightness-50 object-cover"
          src={homeImage?.url}
          alt={homeImage?.altText || "cover image"}
        />
        <div className="relative z-50 bottom-36">
          <TheHeroBanner />
        </div>
      </div>

      <ThePerks />
      <div className="py-16">
        <TheFeaturedCollection />
      </div>
    </main>
  );
}
