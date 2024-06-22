import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import TheCartTableQuantity from "./TheCartTableQuantity";
import Link from "next/link";

export default function TheCartTable({ cartItems }: { cartItems: any[] }) {
  const mappedCartItems =
    cartItems &&
    cartItems.map((item) => {
      const eur = item.cost.totalAmount.currencyCode === "EUR" && "€";
      return (
        <TableRow key={item.id}>
          <TableCell className="font-medium">
            <div className="flex gap-12 items-center">
              <Image
                src={item.merchandise.product.featuredImage.transformedSrc}
                alt="product image"
                width={300}
                height={300}
              />
              <h3></h3>
            </div>
          </TableCell>
          <TableCell>
            <Link href={`/product/${item.merchandise.product.handle}`} className="text-xs md:text-base">
              {item.merchandise.product.title}
            </Link>
            {item.merchandise?.selectedOptions.map((option: any, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-xs text-gray-500"
              >
                <p>
                  {option.name}: {option.value}
                </p>
              </div>
            ))}
          </TableCell>
          <TableCell>
            <TheCartTableQuantity cart={item} />
          </TableCell>
          <TableCell className="text-right">
            {eur}
            {item.cost.totalAmount.amount}
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{mappedCartItems}</TableBody>
    </Table>
  );
}
