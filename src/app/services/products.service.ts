import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { map, Observable, of, shareReplay } from "rxjs";
import { Product, ProductData } from "../modules/product.module";

@Injectable()
export class ProductsService extends DefaultDataService<Product> {

    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
        super('Course', http, httpUrlGenerator);
    }

    override getAll(): Observable<Product[]> {
        const URL = 'assets/sensors.json';
        return this.http.get<ProductData>(URL).pipe(
            map(data => data.components ?? []),
            map(products => products.map(x => { return { ...x, Picture: 'assets/sensors/' + x.Picture + '.png' } })),
            shareReplay() // create only one request even if multiple subscriptions are created
        );
    }

    override upsert(entity: Product): Observable<Product> {
        return of(entity); // no http request
    }

    override add(entity: Product): Observable<Product> {
        return of(entity); // no http request
    }
}