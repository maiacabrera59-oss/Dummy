import { useParams } from "react-router-dom";
import { useProductDetail } from "../hooks/useProductsDetail";

export function ProductDetails() {
  const { id } = useParams();
  const { data, isPending } = useProductDetail(Number(id));

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

  return (
    <>
      <section className="flex flex-col max-w-7xl m-auto p-10">
        <section className="flex gap-7 mt-14">
          <img src={data?.thumbnail} alt={data?.title} />
          <div className="flex flex-col gap-3">
            <span className="text-4xl font-semibold">$ {data?.price}</span>
            <p>{data?.description}</p>
          </div>
        </section>
      </section>
    </>
  );
}
