import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolverService } from 'src/app/services/products.resolver.service';
import { ProductsComponent } from './products.component';

const routes: Routes = [{path: "", component: ProductsComponent, resolve: {Product: ProductResolverService}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
