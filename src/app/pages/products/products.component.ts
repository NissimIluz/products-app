import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/modules/product.module';
import { ProductEntityService } from 'src/app/services/products.entity';
import { AddProductComponent } from './features/add-product/add-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products$: Observable<Product[]>;
  productsNum$: Observable<number>;
  flutyProductsNum$: Observable<number>;
  filterForm = new FormControl()
  constructor(private productEntityService: ProductEntityService, private dialog: MatDialog) {
    this.products$ = productEntityService.entities$;
    this.productsNum$ = productEntityService.count$;
    this.flutyProductsNum$ = this.products$.pipe(
      map(products => products.filter(product => product.ComponentOk != 1).length)
    );
    this.filterForm.valueChanges.subscribe(() => this.filter());
  }

  update(product: Product) {
    this.productEntityService.upsert(product);
  }

  filter() {
    this.products$ = this.products$.pipe(
      map(products => products.filter(product => product?.WebSiteDeviceName?.includes(this.filterForm.value)))
    );

    this.productsNum$ = this.products$.pipe(
      map(products => products.length)
    );

    this.flutyProductsNum$ = this.products$.pipe(
      map(products => products.filter(product => product.ComponentOk != 1).length)
    );
  }

  openEditor(product: Product | null = null): void {
    let dialogRef = this.dialog.open(AddProductComponent, {
      data: product,
      width: '500px;'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        if (product) {// update
          this.update(data);
        }
        else {// insert 
          this.productEntityService.add(data);
        }
      }
    });
  }

}
