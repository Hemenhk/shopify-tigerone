"use client";
import TheProductImages from "@/components/product/TheProductImages";
import TheProductPrice from "@/components/product/TheProductPrice";
import { getProductByHandle } from "@/graphql/queries/product-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import TheProductDesc from "@/components/product/TheProductDesc";
import QuantitySelector from "@/components/product/QuantitySelector";
import { addLineItemToCart } from "@/graphql/mutations/add-to-cart";
import { useToast } from "@/components/ui/use-toast";
import TheProductVariants from "@/components/product/TheProductVariants";
import TheAverageRating from "@/components/product/reviews/TheAverageRating";
import ReviewAccordion from "@/components/product/reviews/TheReviewAccordion";
import { useCheckout } from "@/context/checkoutContext";

export default function TheProduct({
  productHandle,
}: {
  productHandle: string;
}) {
  const { toast, dismiss } = useToast();
  const [count, setCount] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState("");

  const { cart } = useCheckout();
  const queryClient = useQueryClient();

  const {
    data: productData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductByHandle(productHandle),
  });

  useEffect(() => {
    if (productData) {
      const firstVariantId =
        productData?.data?.productByHandle?.variants?.nodes?.[0]?.id;
      if (firstVariantId) {
        setSelectedVariantId(firstVariantId);
      }
    }
  }, [productData]);

  const { mutateAsync: addLineItem } = useMutation({
    mutationKey: ["add"],
    mutationFn: async () => {
      if (!selectedVariantId) {
        throw new Error("No variant selected");
      }
      await addLineItemToCart(cart.id, selectedVariantId, count);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cartItems"] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching product.</div>;
  }

  const product = productData?.data?.productByHandle;

  if (!product) {
    return <div>Product not found.</div>;
  }

  const addToCartHandler = () => {
    addLineItem();
    toast({
      title: `x${count} - ${product.title}`,
      description: `${
        product.variants.nodes.find(
          (variant) => variant.id === selectedVariantId
        )?.title
      } added to the cart`,
    });

    setTimeout(() => {
      dismiss();
    }, 1500);
  };

  return (
    <main className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-8 h-full pt-28">
      <div className="flex flex-col items-center gap-20 md:w-2/4 h-full">
        <TheProductImages product={product} />
        <div className="hidden xl:flex">
          <ReviewAccordion itemHandle={productHandle} />
        </div>
      </div>
      <div className="flex w-full flex-col text-center xl:text-left md:w-[500px] h-full">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {product.vendor}
        </p>
        <h2 className="text-2xl text-center xl:text-left tracking-wide uppercase font-light px-4 md:px-0 py-6">
          {product.title}
        </h2>
        <TheAverageRating productHandle={productHandle} />

        <TheProductPrice product={product} />
        <TheProductVariants
          variants={product.variants.nodes}
          selectedVariantId={selectedVariantId}
          onVariantSelect={(variantId: any) => {
            setSelectedVariantId(variantId);
          }}
        />
        <QuantitySelector count={count} setCount={setCount} />
        <div className="flex justify-center xl:justify-start">
          <Button
            onClick={addToCartHandler}
            className="uppercase tracking-widest font-normal mt-8 w-[330px] md:w-[400px] mx-auto md:mx-0 rounded-none bg-black"
          >
            Add to Cart
          </Button>
        </div>

        <TheProductDesc product={product} />
        <div className="flex mx-auto w-3/4 md:hidden">
          <ReviewAccordion itemHandle={productHandle} />
        </div>
      </div>
    </main>
  );
}
