import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntar-movilizacion',
  templateUrl: './preguntar-movilizacion.page.html',
  styleUrls: ['./preguntar-movilizacion.page.scss'],
})
export class PreguntarMovilizacionPage {
  constructor(private router: Router) {}

  hasMovilizacion(hasVehicle: boolean) {
    if (hasVehicle) {
      this.router.navigate(['/home']); // Redirige a ConMovilizacion si tiene vehículo
    } else {
      this.router.navigate(['/sinmovilizacion']); // Redirige a SinMovilizacion si no tiene vehículo
    }
  }
}
