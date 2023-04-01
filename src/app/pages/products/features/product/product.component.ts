import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/modules/product.module';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;
  @Output() onStartUpdate: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() onUpdate: EventEmitter<Product> = new EventEmitter<Product>();
  constructor() { }

  ngOnInit(): void {
  }

  changeIndicator() {
    this.product = {...this.product, ComponentOk: (this.product.ComponentOk+1)%2};
    this.onUpdate.emit(this.product);
  }

  startUpdate(){
    this.onStartUpdate.emit(this.product);
  }
}
