import { useUserStore } from "../store/useUserStore";
import { useUserCart } from "../hooks/useAllCarts";
import { useState, useEffect } from "react";

export function Cart() {
  const user = useUserStore((state) => state.user);//obtengo el usuario logueado desde el store
  const [loadingUser, setLoadingUser] = useState(true);// estado para manejar la carga del usuario
  const { data, isPending } = useUserCart(user?.id);

  useEffect(() => {
    setLoadingUser(false);
  }, [user]);

  if (loadingUser || isPending) {
    return (
       <section className="h-[70vh] flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-[#607d55] rounded-full animate-spin" />
        <h2 className="text-lg font-semibold text-gray-600 tracking-wide">
          Cargando...
        </h2>
      </section>
    );
  }
  const carts = data?.carts || [];

  return (
    <section className="p-20 py-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-12 max-w-6xl mx-auto">
        {carts.length > 0 ? (
          carts.map((cart: any) => (
            <div
              key={cart.id}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              {/* HEADER DEL CARRITO */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Carrito #{cart.id}</h2>
                <span className="text-xl font-bold text-[#607d55]">
                  Total: ${cart.total}
                </span>
              </div>

              {/* PRODUCTOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* Recorro los productos del carrito y renderizo una card con los datos de cada uno */}
                {cart.products.map((prod: any) => (
                  <div
                    key={prod.id}
                    className="p-4 bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl flex flex-col"
                  >
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />

                    <h3 className="text-lg line-clamp-2 text-center">
                      {prod.title}
                    </h3>

                    <div className="flex justify-center mt-2">
                      <span className="font-bold">${prod.price}</span>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-1">
                      Cantidad: {prod.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No hay carritos disponibles.</p>
        )}
      </div>
    </section>
  );
}
