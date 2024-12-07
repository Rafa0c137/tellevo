import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { RegistroconductorPageRoutingModule } from './registroconductor-routing.module';
import { RegistroconductorPage } from './registroconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,
    RegistroconductorPageRoutingModule
  ],
  declarations: [RegistroconductorPage]
})
export class RegistroconductorPageModule {}
