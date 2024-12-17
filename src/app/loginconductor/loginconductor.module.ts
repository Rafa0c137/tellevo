import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule aquí
import { IonicModule } from '@ionic/angular';
import { LoginconductorPageRoutingModule } from './loginconductor-routing.module';
import { LoginconductorPage } from './loginconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de incluir esto
    IonicModule,
    LoginconductorPageRoutingModule
  ],
  declarations: [LoginconductorPage]
})
export class LoginconductorPageModule {}
