import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'preguntar',
    loadChildren: () => import('./preguntar-movilizacion/preguntar-movilizacion.module').then(m => m.PreguntarMovilizacionPageModule)
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
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),canActivate: [AuthGuard] 

  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'conmovilizacion',
    loadChildren: () => import('./conmovilizacion/conmovilizacion.module').then( m => m.ConmovilizacionPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'sinmovilizacion',
    loadChildren: () => import('./sinmovilizacion/sinmovilizacion.module').then( m => m.SinmovilizacionPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'preguntar-movilizacion',
    loadChildren: () => import('./preguntar-movilizacion/preguntar-movilizacion.module').then( m => m.PreguntarMovilizacionPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

