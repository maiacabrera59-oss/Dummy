import { useQuery } from "@tanstack/react-query";
import { getProductsDetails } from "../services";

export function useProductDetail(id: number | undefined) {
  return useQuery({
    queryKey: ["products-details", id],
    queryFn: () => getProductsDetails(id),
  });
}
