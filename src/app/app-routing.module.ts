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
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'restablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then(m => m.RestablecerPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'conmovilizacion',
    loadChildren: () => import('./conmovilizacion/conmovilizacion.module').then( m => m.ConmovilizacionPageModule)
  },
  {
    path: 'sinmovilizacion',
    loadChildren: () => import('./sinmovilizacion/sinmovilizacion.module').then( m => m.SinmovilizacionPageModule)
  },
  {
    path: 'conmovilizacion',
    loadChildren: () => import('./conmovilizacion/conmovilizacion.module').then(m => m.ConmovilizacionPageModule)
  },
  {
    path: 'sinmovilizacion',
    loadChildren: () => import('./sinmovilizacion/sinmovilizacion.module').then(m => m.SinmovilizacionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
