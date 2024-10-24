import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConmovilizacionPageRoutingModule } from './conmovilizacion-routing.module';

import { ConmovilizacionPage } from './conmovilizacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConmovilizacionPageRoutingModule
  ],
  declarations: [ConmovilizacionPage]
})
export class ConmovilizacionPageModule {}
