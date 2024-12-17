import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroconductorPage } from './registroconductor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroconductorPageRoutingModule {}
