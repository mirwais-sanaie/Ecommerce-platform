import ProductList from "../_components/layout/ProductList";

const page = async () => {
  const res = await fetch("http://localhost:8000/products");
  const products = await res.json();

  return (
    <div className="m-10">
      <ProductList products={products} />
    </div>
  );
};

export default page;
