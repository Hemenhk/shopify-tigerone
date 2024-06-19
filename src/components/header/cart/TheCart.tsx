"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ShoppingBag } from "lucide-react";
import TheCartItems from "./components/TheCartItems";
import TheCartTotalBtn from "./components/TheCartTotalBtn";
import { Badge } from "@/components/ui/badge";
import { useCheckout } from "@/context/checkoutContext";

export default function TheCart() {
  const { cart } = useCheckout();

  console.log("cartData", cart);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <ShoppingBag size={30} />
          <Badge className="bg-red-800 hover:bg-red-800 size-5 rounded-full text-xs flex justify-center items-center absolute top-0 right-0 -mt-1.5 -mr-1.5">
            {cart && cart?.totalQuantity > 0 ? cart?.totalQuantity : 0}
          </Badge>
        </div>
      </SheetTrigger>
      <SheetContent side={"right"} className="p-0 w-full md:w-3/4">
        <SheetHeader className="border-b p-6">
          <SheetTitle className="uppercase text-xl text-left font-normal tracking-widest">
            Cart
          </SheetTitle>
        </SheetHeader>
        <div className="h-4/5">
          <TheCartItems />
        </div>
        <SheetFooter className="relative w-full bg-white pt-5 border-t">
          <TheCartTotalBtn />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
