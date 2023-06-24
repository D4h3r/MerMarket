import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home/registro', // Ruta ajustada para incluir la carpeta "registro" dentro de "home"
    loadChildren: () => import('./home/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
<<<<<<< HEAD
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },

=======
  },


>>>>>>> 7d696ae14f1b88dd6e1e84ad5c5a5f123e1d0e5d
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
