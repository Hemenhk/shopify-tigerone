"use client";

import { useAdminValues, useShopQuery } from "@/hooks/useQueryHooks";
import TheFooterMenu from "./components/TheFooterMenu";
import ThePaymentMethods from "./components/ThePaymentMethods";

export default function TheFooter() {
  const { data: shopData } = useShopQuery();
  const { data: footerData } = useAdminValues();

  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer
      className="h-80 text-gray-200"
      style={{ backgroundColor: footerData?.footerBackgroundColor }}
    >
      <div className="flex flex-row justify-between px-5 pt-14 gap-8 h-3/4">
        <div className="flex flex-col justify-between">
          <h2 className="uppercase tracking-wider font-light">{shopData?.data.shop.name}</h2>
          <ThePaymentMethods />
        </div>
        <div>
          <TheFooterMenu />
        </div>
      </div>
      <div className="flex items-center justify-between px-5  w-full h-1/4 border-t">
        <div className="flex flex-row gap-5">
          <p className="font-light tracking-wide text-sm md:text-base">
            © {year} {shopData?.data.shop.name} All rights reserved
          </p>
          |<p className="font-light tracking-wide text-sm md:text-base"> Designed in Sweden</p>
        </div>
        <div>
          <p className="font-light tracking-wide text-sm md:text-base">Crafted by Hemen</p>
        </div>
      </div>
    </footer>
  );
}
