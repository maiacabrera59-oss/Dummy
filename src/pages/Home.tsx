import { useState } from "react";
import { CardProducts } from "../components/ui/CardProducts";
import { useAllProducts } from "../hooks/useAllProducts";
import { Form as EditForm } from "../components/ui/EditForm";

interface Product {
  id: number;
  title: string;
  thumbnail: string; 
  price: number;
  category: string;
  description: string;
  rating: number;
  stock: number;
}

export function Home() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data, isPending } = useAllProducts();

  if (isPending) {
    return (
      <section className="h-[70vh] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#607d55] rounded-full animate-spin" />
        <h2 className="text-lg font-semibold text-gray-600 tracking-wide">
          Cargando...
        </h2>
      </section>
    );
  }

  const responseData = data as any;
  const products = responseData?.products || [];

  return (
    <>
      <section className="flex flex-col justify-center items-center p-10">
        <div className="flex flex-wrap justify-center gap-5 mt-20 ">
          {products.map((product: Product) => (
            <CardProducts
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.rating}
              stock={product.stock}
              onEdit={() => {
                setSelectedProduct(product);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* Modal de Edición */}
      {open && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-2xl">
            <EditForm
              id={selectedProduct.id}
              initialData={{
                title: selectedProduct.title,
                description: selectedProduct.description,
                category: selectedProduct.category,
                price: selectedProduct.price,
                thumbnail: selectedProduct.thumbnail,
              }}
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
