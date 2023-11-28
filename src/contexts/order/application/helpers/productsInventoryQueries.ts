import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import ProductRepository from "@/contexts/product/infrastructure/ProductRepository";

export async function checkProductAvailableOrFail(newProduct: ProductEntity, amount: number) {
  const productFromRepository = (await ProductRepository.getById(newProduct.id)).attributes;

  if (productFromRepository.amount < amount) {
    throw Error(`Cannot add product since available amout is ${productFromRepository.amount}`);
  }
}

export async function updateProductAvailable(newProduct: ProductEntity, amount: number) {
  ProductRepository.updateProductAmount(newProduct.id, newProduct.amount - amount);
}