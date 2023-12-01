import { CollectionEntity } from "@/contexts/collection/domain/CollectionEntity";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";

export interface ProductEntity {
  collection: CollectionEntity;
  amount: number;
  price: number;
  category: string;
  photos: StrapiMediaEntity
}
