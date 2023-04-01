import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { filter, first, tap } from 'rxjs/operators';
import { ProductEntityService } from './products.entity';

@Injectable()
export class ProductResolverService implements Resolve<boolean> {

    constructor(private productEntityService: ProductEntityService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const retVal: Observable<boolean> = this.productEntityService.loaded$
            .pipe(
                tap((loaded:boolean) => {
                    if (!loaded) {
                        this.productEntityService.getAll();
                    }
                }), 
                filter((loaded:boolean) => !!loaded), // ensure that the observable will wait until to load completed
                first() // ensure that when the loaded completed the observable will be terminated

            );
        return retVal;
    }
}
