import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroDetallesPageRoutingModule } from './registro-detalles-routing.module';

import { RegistroDetallesPage } from './registro-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroDetallesPageRoutingModule,
    ReactiveFormsModule // Importa ReactiveFormsModule para que funcione el formulario
  ],
  declarations: [RegistroDetallesPage]
})
export class RegistroDetallesPageModule {}
