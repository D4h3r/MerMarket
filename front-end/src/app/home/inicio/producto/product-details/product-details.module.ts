import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductDetailsComponent } from './product-details.component';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ProductDetailsComponent]
})
export class ProductDetailsModule { }