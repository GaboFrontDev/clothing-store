import ProductRepository from "../infrastructure/ProductRepository";

export class ProductController {
  constructor() {}

  getProductsById(id: string) {
    return ProductRepository.getById(id);
  }

  getProducts() {
    return ProductRepository.getAllProducts();
  }
}