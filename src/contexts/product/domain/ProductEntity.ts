import { CollectionEntity } from "@/contexts/collection/domain/CollectionEntity";

export interface ProductEntity {
  id: string;
  collections: CollectionEntity;
}
