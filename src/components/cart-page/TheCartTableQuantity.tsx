"use client";

import { updateLineItem } from "@/graphql/mutations/update-lineItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import TheCartTableRemove from "./TheCartTableRemove";
import { useCheckout } from "@/context/checkoutContext";

export default function TheCartTableQuantity({ cart }: { cart: any }) {
  const queryClient = useQueryClient();
  const { quantity, merchandise, id } = cart;
  const { cart: checkout } = useCheckout();

  const checkoutId = checkout.id;
  const [count, setCount] = useState(quantity || 1);

  const { mutateAsync: updateLineItemMutation } = useMutation({
    mutationKey: ["cartItems"],
    mutationFn: () => updateLineItem(checkoutId, id, merchandise.id, count),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cartItems"] });
    },
  });

  const minusHandler = async () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      await updateLineItemMutation();
    }
  };

  const plusHandler = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await updateLineItemMutation();
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-5">
      <div className="flex items-center justify-between gap-4 border border-[#dbdbdb] rounded px-[20px] py-[8px]  w-[100px]">
        <Minus onClick={minusHandler} size={15} cursor={"pointer"} />
        <p>{quantity}</p>
        <Plus onClick={plusHandler} size={15} cursor={"pointer"} />
      </div>
      <TheCartTableRemove lineItemId={cart.id} />
    </div>
  );
}
