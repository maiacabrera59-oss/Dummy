import { api } from "../lib/api";
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
  return await api.get(`/products`);
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
  return await api.put(`/products/${id}`, body);
}
async function createProducts(body: Product): Promise<any> {
  return await api.post('/products/add', {
    title: body.title,
    price: body.price,
    description: body.description,
    thumbnail: body.thumbnail
  });
}
async function getAllUsers() {
  return await api.get('/users');

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