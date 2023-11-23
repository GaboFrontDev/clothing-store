import { StrapiRepository } from "@/contexts/shared/infrastructure/StrapiRepository";
import { ProductEntity } from "../domain/ProductEntity";


class ProductRepository extends StrapiRepository<ProductEntity> {

}

export default ProductRepository;
