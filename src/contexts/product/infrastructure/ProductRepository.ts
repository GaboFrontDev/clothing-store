import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { ProductEntity } from "../domain/ProductEntity";

class ProductRepositoryClass extends StrapiRepository<ProductEntity> {
  rels = {
    collection: {
      name: "[collection]",
      field: "[id]",
    },
    category: {
      name: "[category]",
    },
  };

  constructor() {
    super("products");
  }

  async getById(id: string) {
    return (await this.getSingleItem(`/${id}`)).data;
  }

  async getAllProducts() {
    return (await this.get(`?populate=*`)).data;
  }

  async getProductsByCollectionId(collection_id: string) {
    const {
      collection: { name, field },
    } = this.rels;
    return await this.getByQuery(
      `?populate=*&filters${name}${field}[$eq]=${collection_id}`
    );
  }
  
  async getProductsByCategory(category: string) {
    const {
      category: { name },
    } = this.rels;
    return await this.getByQuery(
      `?populate=*&filters${name}[$eq]=${category}`
    );
  }
  

  async updateProductAmount(id: string, amount: number){
    const payload = JSON.stringify({
      amount
    })
    this.update(payload, id)
  }
}

const ProductRepository = new ProductRepositoryClass();
export default ProductRepository;
