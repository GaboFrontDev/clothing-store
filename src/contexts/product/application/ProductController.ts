import ProductRepository from "../infrastructure/ProductRepository";

export class ProductController {
  constructor() {}

  async getProductsById(id: string) {
    return await ProductRepository.getById(id);
  }

  async getProductsByCategory(category: string) {
    return await ProductRepository.getProductsByCategory(category);
  }

  async getProducts() {
    return await ProductRepository.getAllProducts();
  }
}