import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDetallesPage } from './registro-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDetallesPageRoutingModule {}
