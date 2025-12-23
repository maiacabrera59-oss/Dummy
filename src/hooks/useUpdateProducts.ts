import { useMutation } from "@tanstack/react-query";
import { updateProducts } from "../services";

export interface Product {
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

type UpdateProductParams = {
  id: number;
  body: Product;
};

export function useUpdateProduct() {
  return useMutation<Product, Error, UpdateProductParams>({
    mutationKey: ["update-product"],
    mutationFn: ({ id, body }) => updateProducts(id, body),
  });
}
