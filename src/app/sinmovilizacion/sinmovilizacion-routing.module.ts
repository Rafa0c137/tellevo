import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinmovilizacionPage } from './sinmovilizacion.page';

const routes: Routes = [
  {
    path: '',
    component: SinmovilizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinmovilizacionPageRoutingModule {}
