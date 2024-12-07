import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConmovilizacionPage } from './conmovilizacion.page';

const routes: Routes = [
  {
    path: '',
    component: ConmovilizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConmovilizacionPageRoutingModule {}
