export default function ProductGrid({
  title,
  columns,
  products,
}: {
  title: string;
  columns: number;
  products: { id: number; name: string; price: number; image: string }[];
}) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {products.map(
            (product: {
              id: number;
              name: string;
              price: number;
              image: string;
            }) => (
              <div
                key={product.id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-green-600 font-bold text-xl">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Comprar
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
