import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import { productType } from "@/types/projectTypes";

function ProductItem({ product }: { product: productType }) {
  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold line-clamp-1">
          {product.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-lg font-bold">${product.price}</span>
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}

export default ProductItem;
