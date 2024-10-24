import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinmovilizacionPageRoutingModule } from './sinmovilizacion-routing.module';

import { SinmovilizacionPage } from './sinmovilizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinmovilizacionPageRoutingModule
  ],
  declarations: [SinmovilizacionPage]
})
export class SinmovilizacionPageModule {}
