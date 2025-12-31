import { useQuery } from "@tanstack/react-query";

export function useUserCart(userId: number | undefined) {
    return useQuery({
        queryKey: ['user-cart', userId],
        queryFn: async () => {
            if (!userId) return null;
            const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
            if (!response.ok) throw new Error("Error al obtener el carrito");
            return response.json();
        },
    });
}