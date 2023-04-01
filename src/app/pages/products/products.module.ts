import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from 'src/app/services/products.service';
import { ProductComponent } from './features/product/product.component';
import { EntityDefinitionService, EntityDataService, EntityMetadataMap } from '@ngrx/data';
import { ProductEntityService } from 'src/app/services/products.entity';
import { ProductResolverService } from 'src/app/services/products.resolver.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { AddProductComponent } from './features/add-product/add-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    AddProductComponent
  ],
  imports: [
    ProductsRoutingModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ProductsComponent],
  providers: [
    ProductsService,
    ProductResolverService,
    ProductEntityService
  ]
})
export class ProductsModule {
  constructor(
    ads: EntityDefinitionService,
    entityDataService: EntityDataService,
    productService: ProductsService) {

    const entityMetadataMap: EntityMetadataMap = {
      Product: {
        selectId: product => product.DeviceId,
        filterFn: (entities: { name: string }[], search: string) => {
          return entities.filter(e => -1 < e.name.indexOf(search));
        }
      }
    }

    ads.registerMetadataMap(entityMetadataMap);
    entityDataService.registerService('Product', productService);
  }
}