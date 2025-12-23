import { useQuery } from "@tanstack/react-query";
import {getAllCarts} from "../services"

export function useAllCarts(){
    return useQuery({
    queryKey: ['all-carts'],
    queryFn: getAllCarts,
    })
}