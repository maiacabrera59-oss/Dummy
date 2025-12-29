import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCreateProducts } from "../hooks/useCreateProducts";

export interface CreateProduct {
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

const productSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  price: z.number().min(0.1, "El precio debe ser mayor o igual a 0.1"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  thumbnail: z.string().url("Debe ser una URL válida"),
});

type ProductFormData = z.infer<typeof productSchema>;

export function Form() {
  const { mutate, isPending } = useCreateProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      thumbnail: "",
    },
  });

  function onSubmit(data: ProductFormData) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Producto agregado con éxito");
        reset();
      },
      onError: () => {
        toast.error("Ocurrió un error al agregar el producto");
      },
    });
  }

  return (
    <section className="min-h-screen  from-gray-50 to-white py-24 px-6">
      <div className="max-w-xl mx-auto mt-44">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-gray-200/60 p-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Nuevo Producto
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Completá los datos para agregar un nuevo producto al catálogo
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Título */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Título
              </label>
              <input
                {...register("title")}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Precio */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Precio
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Descripción
              </label>
              <textarea
                rows={4}
                {...register("description")}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 resize-none
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                URL de la Imagen
              </label>
              <input
                {...register("thumbnail")}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              {errors.thumbnail && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-14 bg-gray-700   text-white font-bold rounded-xl
              shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {isPending ? "Guardando..." : "Agregar Producto"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
