"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

type FormFieldType = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
};

type FormType = {
  values: any;
  onSubmit: any;
  formFields: FormFieldType[];
  formSchema: any;
  formTitle: string;
};

export default function TheForm({
  values,
  onSubmit,
  formFields,
  formSchema,
  formTitle,
}: FormType) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    values: values,
  });

  const pathname = usePathname();
  const isSigninPage = pathname === "/credentials/signin";

  const mappedFormFields = formFields.map((formField: FormFieldType) => (
    <FormField
      key={formField.name}
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={formField.placeholder}
              type={formField.type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
  const goBackHandler = () => {
    router.push("/admin/design");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 md:p-20 mx-auto"
      >
        {!isSigninPage ? (
          <BsFillArrowLeftCircleFill
            size={30}
            cursor={"pointer"}
            onClick={goBackHandler}
          />
        ) : (
          ""
        )}

        <h2 className="text-xl tracking-wide">{formTitle}</h2>
        {mappedFormFields}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
