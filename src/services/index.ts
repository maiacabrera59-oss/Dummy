import { api } from "../lib/api";
import type { UsersResponse } from "../types/users";
export interface Product {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}
async function getAllCarts() {
  return await api.get(`/carts`);

}

async function getAllProducts() {
  return await api.get(`/products?limit=0`);
}
async function getProductsDetails(id: number | undefined): Promise<Product> {
  return api.get(`/products/${id}`);
}
async function deleteProducts(id: number | undefined) {
  return await api.delete(`/products/${id}`);

}
async function updateProducts(
  id: number,
  body: Product
) {
  const response = await api.put(`/products/${id}`, body)
  return response.data
}
async function createProducts(body: Product): Promise<Product> {
  return await api.post('/products/add', {
    title: body.title,
    price: body.price,
    description: body.description,
    thumbnail: body.thumbnail
  });
}
async function getAllUsers(): Promise<UsersResponse> {
  const res = await fetch("https://dummyjson.com/users?limit=200");
  if (!res.ok) throw new Error("Error fetching users");
  return res.json();
}
export {
  getAllCarts,
  getAllProducts,
  getProductsDetails,
  deleteProducts,
  updateProducts,
  createProducts,
  getAllUsers
}