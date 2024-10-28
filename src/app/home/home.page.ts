import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MapboxServiceService, feature } from './mapbox-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  addresses: string[] = [];
  selectedAddress: string | null = null;

  constructor(
    private navCtrl: NavController,
    private mapboxService: MapboxServiceService
  ) {}

  // Método para manejar la búsqueda en el ion-searchbar
  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.search_word(searchTerm).subscribe((features: feature[]) => {
        this.addresses = features.map(feat => feat.place_name);
      });
    } else {
      this.addresses = [];
    }
  }

  // Método para seleccionar una dirección de la lista de resultados
  onSelect(address: string) {
    this.selectedAddress = address;
    this.addresses = [];
  }

  // Método para manejar la respuesta de movilización
  handleResponse(hasTransport: boolean) {
    if (hasTransport) {
      this.navCtrl.navigateForward('/conmovilizacion');
    } else {
      this.navCtrl.navigateForward('/sinmovilizacion');
    }
  }

  // Método para navegación a otras páginas
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token'); 
    this.navCtrl.navigateRoot('/login');
  }
}
