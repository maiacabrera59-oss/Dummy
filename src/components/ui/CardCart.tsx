
{/*Tipado de las props defino qué información necesita la card para renderizarse(mostrarse)*/}
interface CardProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  total: number;
  quantity: number;
}

export function Card({ title, price, thumbnail }: CardProps) {
  return (
    <div className=" p-20 bg-blend-saturation  shadow-md hover:shadow-2xl transition-shadow duration-500 justify-center ">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />
      <h1 className="text-xl  line-clamp-2">{title}</h1>
      <div className="flex justify-center items-center mt-3">
        <span className="text-lg font-bold flex  ">${price}</span>
      </div>
    </div>
  );
}
