async function page({ params }: { params: Promise<{ productId: number }> }) {
  const { productId } = await params;
  return (
    <div>
      <h1>Product {productId}</h1>
    </div>
  );
}

export default page;
