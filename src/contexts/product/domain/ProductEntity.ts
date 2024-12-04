import { CollectionEntity } from "@/contexts/collection/domain/CollectionEntity";
import { SizeEntity } from "@/contexts/shared/domain/SizeEntity";
import { StrapiEntryEntity } from "@/contexts/shared/domain/StrapiEntity";
import { StrapiMediaEntity } from "@/contexts/shared/domain/StrapiMediaEntity";

export interface ProductEntity {
  collection: StrapiEntryEntity<CollectionEntity>;
  amount: number;
  price: number;
  category: string;
  name: string;
  size: StrapiEntryEntity<SizeEntity>;
  description: string,
  pay_url: string,
  photos: {
    data: StrapiMediaEntity[];
  };
  isHome: boolean;
}
