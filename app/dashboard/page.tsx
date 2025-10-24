"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { Label } from "@/app/_components/ui/label";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addProduct } from "@/lib/data";

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price")
    .min(1),
  description: z.string().min(5, "Description is required"),
  category: z.string().min(2, "Category is required"),
  image: z.any(),
});

type FormData = z.infer<typeof formSchema>;

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const file = data.image?.[0];
      let imageBase64 = "";

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise((resolve) => {
          reader.onload = () => {
            imageBase64 = reader.result as string;
            resolve(true);
          };
        });
      }

      const productData = {
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category,
        image: imageBase64, // or upload URL later
        id: Date.now(),
        quantity: 1,
      };

      await addProduct(productData);

      toast.success("Product Added Successfully!");

      reset();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Add Product</CardTitle>
          <CardDescription>
            Fill out the details to add a new product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter product title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="Enter product category"
                {...register("category")}
              />
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">Image is required</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white"
            >
              {loading ? "Submitting..." : "Submit Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
