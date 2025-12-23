import { useAllCarts } from "../hooks/useAllCarts";

export function Cart() {
  const { data, isPending } = useAllCarts();

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
  const carts = responseData?.carts || (Array.isArray(data) ? data : []);

  return (
    <section className="p-20 py-10 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap gap-8 justify-center">
        {carts.map((cart: any) => (
          <div
            key={cart.id}
            className="w-88 bg-white rounded-4xl p-6 shadow-xl border border-gray-100 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-gray-50 text-gray-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                  Carrito #{cart.id}
                </span>

                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                  {cart.totalProducts} PRODUCTOS
                </span>
              </div>

              <div
                className={`
                  bg-gray-100 mb-6 p-1 rounded-2xl grid gap-1
                  ${cart.products.length === 1 && "grid-cols-1 h-48"}
                  ${cart.products.length === 2 && "grid-cols-2 h-48"}
                  ${cart.products.length >= 3 && "grid-cols-3 h-48"}
                  ${cart.products.length >= 7 && "grid-cols-4 h-48"}
                `}
              >
                {cart.products.map((prod: any) => (
                  <img
                    key={prod.id}
                    src={prod.thumbnail}
                    alt={prod.title}
                    className="w-full h-full object-cover rounded-lg bg-white"
                  />
                ))}
              </div>

              {/* TEXTO DEL CARRITO */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Resumen del Pedido
              </h2>

              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                <span className="font-medium">
                  {cart.products[0]?.title}...
                </span>
              </p>
            </div>

            <div className="flex items-center justify-center mt-auto">
              <span className="text-2xl font-black text-gray-900">
                ${cart.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
