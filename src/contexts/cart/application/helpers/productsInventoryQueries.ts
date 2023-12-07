import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import ProductRepository from "@/contexts/product/infrastructure/ProductRepository";

export async function checkProductAvailableOrFail(newProductId: string, amount: number) {
  const productFromRepository = (await getProductById(newProductId));

  if (productFromRepository.attributes.amount < amount) {
    throw Error(`Cannot add product since available amout is ${productFromRepository.attributes.amount}`);
  }
}

export async function updateProductAvailable(newProductId: string, amount: number) {
  const newProduct =  await getProductById(newProductId);
  ProductRepository.updateProductAmount(newProduct.id as string, newProduct.attributes.amount - amount);
}

export async function getProductById(productId: string) {
  return (await ProductRepository.getById(productId));

}