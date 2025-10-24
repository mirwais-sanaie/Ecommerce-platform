import { productType } from "@/types/projectTypes";
import { toast } from "sonner";

export async function addProduct(data: productType) {
  try {
    const res = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("product added.");
    return result;
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
}
