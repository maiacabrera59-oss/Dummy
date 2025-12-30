//este hook que se encarga de obtener el carrito del usuario logueado usando React Query
import { useQuery } from "@tanstack/react-query";

export function useUserCart(userId: number | undefined) {
    return useQuery({
        //Colave única para la caché depedendiendo del ID del usuario
        queryKey: ['user-cart', userId],
        queryFn: async () => {
            if (!userId) return null;
            const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
            if (!response.ok) throw new Error("Error al obtener el carrito");
            return response.json();
        },
        enabled: !!userId, // No hace la petición si no hay ID 
    });
}