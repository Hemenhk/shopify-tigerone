"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import { getShopLinks } from "@/graphql/queries/shop-links";
import { useAdminValueMutation } from "@/hooks/useQueryHooks";

const FormSchema = z.object({
  featuredCollection: z.string({
    required_error: "Please select a collection to feature.",
  }),
});

export default function FeaturedCollectionPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: collectionData } = useQuery({
    queryKey: ["shop-link"],
    queryFn: getShopLinks,
  });

  const { mutateAsync: adminMutation } = useAdminValueMutation();

  const availableCollections: any[] = collectionData?.data?.collections?.nodes;

  console.log("AC", availableCollections);

  const mappedAvailableCollections =
    availableCollections &&
    availableCollections.map((collection: any) => (
      <SelectItem key={collection.id} value={collection.id}>
        {collection.title}
      </SelectItem>
    ));

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await adminMutation(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 md:p-10 mx-auto"
      >
        <FormField
          control={form.control}
          name="featuredCollection"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Collection</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a collection to feature" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{mappedAvailableCollections}</SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
