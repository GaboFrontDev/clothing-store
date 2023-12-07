import { ProductEntity } from "@/contexts/product/domain/ProductEntity";
import { CartEntity } from "../domain/CartEntity";
import { checkProductAvailableOrFail, getProductById, updateProductAvailable } from "./helpers/productsInventoryQueries";

export class CartController<Request> {

  async addToCart(cart: CartEntity, newProductId: string, amount = 1) {
    let product = null;
    checkProductAvailableOrFail(newProductId, amount);
    const index = cart.products.map(product => product.id).indexOf(newProductId);
    if (index >= 0) {
      product = cart.products[index]; 
      product.attributes.amount += amount;
    } else {
      product = await getProductById(newProductId);
      cart.products.push(product);
    }
    cart.payment_amount += product.attributes.price;
    updateProductAvailable(newProductId, amount);
    return cart;
  }

  async removeFromCart(cart: CartEntity, productId: string, deleteAll = false) {
    const index = cart.products.map(product => product.id).indexOf(productId);
    if (index < 0) {
      throw Error('Product not in cart');
    }
    if (deleteAll) {
      const product = await getProductById(productId);
      updateProductAvailable(productId, -product.attributes.amount);
      cart.products.splice(index, 1);
      return 0;
    }
    cart.products[index].attributes.amount -= 1;
    updateProductAvailable(productId, -1);
    return cart;
  }

}
