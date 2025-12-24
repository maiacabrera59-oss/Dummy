import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteProducts } from "../../hooks/useDeleteProducts";
import Borrar from "../../assets/Borrar.svg";
import IconLapiz from "../../assets/IconLapiz.svg";

interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  onEdit: () => void;
}

export function CardProducts({
  id,
  title,
  description,
  price,
  rating,
  stock,
  thumbnail,
  onEdit,
}: ProductsProps) {
  const { mutate, isPending } = useDeleteProducts();

  function handleDelete() {
    mutate(id, {
      onSuccess: () => toast.success("Producto eliminado"),
      onError: () => toast.error("Ocurrió un error al borrar"),
    });
  }

  return (
    <div className="group relative w-full max-w-[320px] bg-gray-100 rounded-[2.5rem] p-5  transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 flex flex-col h-full border-b-current ">
      <div className="relative aspect-square w-full overflow-hidden bg-[#f9fafb] rounded-3xl mb-5">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold text-gray-800">⭐ {rating}</span>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onEdit}
            className="w-10 h-10 flex items-center justify-center bg-white text-gray-700 rounded-full shadow-md hover:text-blue-600 hover:scale-110 transition-all"
            title="Editar"
          >
            <img src={IconLapiz} alt="" />
          </button>

          <button
            onClick={handleDelete}
            disabled={isPending}
            className="w-6 h-6 flex items-center justify-center bg-white text-red-500 rounded-full shadow-md hover:scale-110 transition-all disabled:opacity-50"
            title="Borrar"
          >
            {isPending ? (
              <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <img src={Borrar} alt="Borrar" className="w-6 h-6 opacity-80" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col px-1 mb-5 gap-2">
        <span
          className={`inline-flex w-fit px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase
          ${
            stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {stock > 0 ? "En stock" : "Agotado"}
        </span>

        {/* TITULO */}
        <h2 className="text-xl font-extrabold text-gray-900 line-clamp-1 italic justify-center flex-3">
          {title}
        </h2>

        {/* DESCRIPCION */}
        <p className="text-sm text-gray-400 leading-snug line-clamp-2 italic">
          {description}
        </p>
      </div>

      {/* PRECIO */}
      <div className="mt-auto mb-4 px-1 flex justify-center">
        <span className="text-2xl font-black text-gray-900">${price}</span>
      </div>

      {/* CTA */}
      <Link
        to={`/${id}`}
        className="w-full h-14 flex items-center justify-center bg-gray-900 text-white text-sm font-bold rounded-2xl"
      >
        Ver detalles del producto
      </Link>
    </div>
  );
}
