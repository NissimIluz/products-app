import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Product } from "../modules/product.module";

@Injectable()
export class ProductEntityService
    extends EntityCollectionServiceBase<Product>{

    constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Product', serviceElementsFactory);
    }
}