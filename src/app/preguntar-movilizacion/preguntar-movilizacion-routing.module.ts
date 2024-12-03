import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntarMovilizacionPage } from './preguntar-movilizacion.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntarMovilizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntarMovilizacionPageRoutingModule {}
