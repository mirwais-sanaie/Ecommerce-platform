import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import QuantityController from "@/app/_components/layout/QuantityController";

interface PageProps {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const res = await fetch(
    `http://localhost:8000/products/${params.productId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  return (
    <div className="m-10 flex flex-col md:flex-row gap-10">
      {/* Product Image */}
      <div className="relative w-full md:w-1/2 h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Product Info */}
      <Card className="w-full md:w-1/2 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {product.title}
          </CardTitle>
          <p className="text-muted-foreground mt-2">{product.category}</p>
        </CardHeader>

        <CardContent>
          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3">
          <span className="text-3xl font-bold">${product.price}</span>

          <QuantityController />

          <Button size="lg" className="mt-2">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
