import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntarMovilizacionPageRoutingModule } from './preguntar-movilizacion-routing.module';

import { PreguntarMovilizacionPage } from './preguntar-movilizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntarMovilizacionPageRoutingModule
  ],
  declarations: [PreguntarMovilizacionPage]
})
export class PreguntarMovilizacionPageModule {}
