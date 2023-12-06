import { CollectionEntity } from "@/contexts/collection/domain/CollectionEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";

export interface ProductEntity {
  collection: StrapiEntryEntity<CollectionEntity>;
  amount: number;
  price: number;
  category: string;
  name: string;
  photos: {
    data: StrapiMediaEntity[];
  };
}
