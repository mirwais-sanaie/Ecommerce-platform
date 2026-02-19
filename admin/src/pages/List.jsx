import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/api/v1/products`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      console.log(data);
      setProducts(data.data.products || []);
    } catch (error) {
      toast.error(error.message || "Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Product deleted");

      // Remove from UI without refetch
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      toast.error(error.message || "Error deleting product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Products</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Sizes</th>
                <th className="p-4">Bestseller</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  {/* Image */}
                  <td className="p-4">
                    <img
                      src={
                        product.images?.[0] ||
                        product.image?.[0] ||
                        "/placeholder.png"
                      }
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-4 font-medium">{product.name}</td>

                  {/* Category */}
                  <td className="p-4">
                    {product.category} / {product.subCategory}
                  </td>

                  {/* Price */}
                  <td className="p-4 font-semibold">${product.price}</td>

                  {/* Sizes */}
                  <td className="p-4">{product.sizes?.join(", ")}</td>

                  {/* Bestseller */}
                  <td className="p-4">
                    {product.isBestSeller ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>

                  {/* Delete */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
