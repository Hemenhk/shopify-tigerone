"use client";

import TheCartCheckout from "@/components/cart-page/TheCartCheckout";
import TheCartTable from "@/components/cart-page/TheCartTable";

import image from "../../../public/empty-cart.png";
import Image from "next/image";
import { useCheckout } from "@/context/checkoutContext";

export default function CartPage() {
  const { cart } = useCheckout();

  if (cart.lines.nodes.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Image src={image} alt="empty-cart" width={200} height={200} />
        <p className="text-lg tracking-wide">Your cart is empty!</p>
      </div>
    );
  }

  // console.log("cart page", cart);
  const cartCost = cart?.cost.totalAmount;
  const cartItems: any[] = cart?.lines.nodes;

  return (
    <div className="m-5 md:m-48">
      <TheCartTable cartItems={cartItems} />
      <TheCartCheckout cartCost={cartCost} checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}
