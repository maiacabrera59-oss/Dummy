import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useUpdateProduct } from "../../hooks/useUpdateProducts";

const productSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  price: z.number().min(0.1, "El precio debe ser mayor o igual a 0.1"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string().min(2, "La categoría debe tener al menos 2 caracteres"),
  thumbnail: z.string().url("Debe ser una URL válida"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface EditFormProps {
  id: number;
  initialData: ProductFormData;
  onClose: () => void;
}

export function Form({ id, initialData, onClose }: EditFormProps) {
  const { mutate, isPending } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  function onSubmit(body: ProductFormData) {
    mutate(
      { id, body },
      {
        onSuccess: () => {
          toast.success("Producto actualizado correctamente");
          onClose();
        },
        onError: () => {
          toast.error("Error al actualizar el producto");
        },
      }
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Editar producto #{id}
        </h2>
        <p className="text-sm text-gray-500">
          Actualizá la información del producto
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            {...register("title")}
            className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precio
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className={`w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.price && (
            <p className="text-xs text-red-600 mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            rows={4}
            {...register("description")}
            className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-xs text-red-600 mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="flex-1 h-11 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isPending ? "Editando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
