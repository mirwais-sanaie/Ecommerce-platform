import PaginagtionController from "../_components/layout/PaginagtionController";
import Pagination from "../_components/layout/Pagination";
import ProductList from "../_components/layout/ProductList";
import SearchBar from "../_components/layout/SearchBar";

interface IStoreProps {
  searchParams: Promise<{ _page?: string; _per_page?: string; q?: string }>;
}

async function Shop({ searchParams }: IStoreProps) {
  const params = await searchParams;
  const page = params._page ?? "1";
  const per_page = params._per_page ?? "5";
  const title = params.q ?? "";

  const res = await fetch(
    `http://localhost:8000/products?_page=${page}&_per_page=${per_page}&q=${title}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();

  const products = data.data;
  const totalPages = data.pages;
  const strPage = Number(page);

  return (
    <div className="m-10 space-y-5">
      <SearchBar />
      <ProductList products={products} />

      <PaginagtionController page={strPage} pageCount={totalPages} />
    </div>
  );
}

export default Shop;
