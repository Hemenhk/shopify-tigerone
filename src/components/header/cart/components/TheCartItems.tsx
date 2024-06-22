"use client";

import Image from "next/image";

import TheRemoveCartItem from "./TheRemoveCartItem";
import TheCartQuantity from "./TheCartQuantity";
import { useCheckout } from "@/context/checkoutContext";

import image from "../../../../../public/empty-cart.png";

export default function TheCartItems() {
  const { cart } = useCheckout();

  if (cart.lines.nodes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-3/4">
        <Image src={image} alt="empty-cart" width={200} height={200} />
        <p className="text-lg tracking-wide">Your cart is empty!</p>
      </div>
    );
  }

  const mappedCartLineItems =
    cart &&
    cart.lines.nodes.map((lineItem: any) => {
      const eur = lineItem.merchandise.price.currencyCode === "EUR" && "€";
      return (
        <li key={lineItem.id} className="border-b pb-6">
          <div className="flex flex-row gap-8">
            <Image
              src={lineItem.merchandise.image.transformedSrc}
              alt={lineItem.merchandise.image.altText || "lineitem image"}
              height={100}
              width={100}
              className="w-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <p className="uppercase text-xs tracking-wider text-gray-400">
                {lineItem.merchandise.product.vendor}
              </p>
              <h3 className="uppercase text-xs md:text-sm tracking-wider">
                {lineItem.merchandise.product.title}
              </h3>

              {lineItem.merchandise?.selectedOptions.map((option: any, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs text-gray-500">
                  <p>
                    {option.name}: {option.value}
                  </p>
                </div>
              ))}

              <p className="text-sm tracking-wider font-medium">
                {eur}
                {lineItem.merchandise.price.amount}
              </p>
              <div className="flex items-end gap-4">
                <TheCartQuantity cart={lineItem} />

                <TheRemoveCartItem lineItemId={lineItem.id} />
              </div>
            </div>
          </div>
        </li>
      );
    });

  return (
    <ul className="flex flex-col w-full gap-10 p-6 overflow-y-scroll max-h-full">
      {mappedCartLineItems}
    </ul>
  );
}
