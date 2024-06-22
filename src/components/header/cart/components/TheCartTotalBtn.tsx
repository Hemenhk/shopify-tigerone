import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useCheckout } from "@/context/checkoutContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function TheCartTotalBtn() {
  const router = useRouter();
  const { cart } = useCheckout();
  const cost = cart && cart.cost;

  const eur = cost.totalAmount.currencyCode === "EUR" && "€";

  const redirectToCartHandler = () => {
    router.push("/cart");
  };

  const checkoutUrlHandler = () => {
    router.push(cart?.checkoutUrl);
  };
  return (
    <SheetClose asChild>
      <div className="flex flex-col w-full mb-5">
        <div className="flex md:hidden">
          <Button
            onClick={checkoutUrlHandler}
            className="flex justify-center tracking-widest font-light w-full mx-3 rounded-none bg-black"
          >
            Total: {eur}
            {cost.totalAmount.amount}
          </Button>
        </div>
        <div className="md:flex">
          <Button
            onClick={redirectToCartHandler}
            className="flex justify-center tracking-widest font-light w-full mx-3 rounded-none bg-black"
          >
            Total: {eur}
            {cost.totalAmount.amount}
          </Button>
        </div>
      </div>
    </SheetClose>
  );
}
