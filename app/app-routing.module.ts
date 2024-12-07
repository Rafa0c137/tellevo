// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]  // Protege la ruta con AuthGuard
  },
  {
    path: 'loginconductor',
    loadChildren: () => import('./loginconductor/loginconductor.module').then(m => m.LoginconductorPageModule)
  },
  {
    path: 'registroconductor',
    loadChildren: () => import('./registroconductor/registroconductor.module').then(m => m.RegistroconductorPageModule)
  },
  {
    path: 'homeconductor',
    loadChildren: () => import('./homeconductor/homeconductor.module').then( m => m.HomeconductorPageModule),
    canActivate: [AuthGuard]  // Protege la ruta con AuthGuard (si es necesario que el conductor esté autenticado)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
