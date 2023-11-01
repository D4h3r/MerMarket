import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home/registro', // Ruta ajustada para incluir la carpeta "registro" dentro de "home"
    loadChildren: () => import('../app/home/registro/registro.module').then(m => m.RegistroPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home/inicio', // Ruta ajustada para incluir la carpeta "registro" dentro de "home"
    loadChildren: () => import('../app/home/inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate: [AuthGuard]

  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
