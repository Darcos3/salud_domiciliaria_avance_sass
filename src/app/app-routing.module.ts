import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/front/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/front/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./pages/front/update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },
  {
    path: 'remember-password',
    loadChildren: () => import('./pages/front/remember-password/remember-password.module').then( m => m.RememberPasswordPageModule)
  },
  {
    path: 'historias-index',
    loadChildren: () => import('./pages/usuario/historias/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'historias-crear',
    loadChildren: () => import('./pages/usuario/historias/crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'historias-detalles/:id',
    loadChildren: () => import('./pages/usuario/historias/detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'historias-update/:id',
    loadChildren: () => import('./pages/usuario/historias/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'configuracion-update',
    loadChildren: () => import('./pages/usuario/configuracion/update/update.module').then( m => m.UpdatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
