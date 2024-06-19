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

  const checkoutUrlHandler = () => {
    router.push("/cart");
  };
  return (
    <SheetClose asChild>
      <Button
        onClick={checkoutUrlHandler}
        className="flex justify-center tracking-widest font-light md:w-full mx-3 rounded-none bg-black"
      >
        Total: {eur}
        {cost.totalAmount.amount}
      </Button>
    </SheetClose>
  );
}
