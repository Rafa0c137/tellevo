import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map!: GoogleMap;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    this.map = await GoogleMap.create({
      id: 'my-map', // ID único del mapa
      element: document.getElementById('map') as HTMLElement,
      apiKey: environment.googleMapsApiKey,
      config: {
        center: {
          lat: -33.43303, // Latitud para Santiago, Chile (puedes cambiarla según tu preferencia)
          lng: -70.61548, // Longitud para Santiago, Chile
        },
        zoom: 12,
      },
    });
  }

  handleResponse(hasTransport: boolean) {
    if (hasTransport) {
      this.navCtrl.navigateForward('/conmovilizacion');
    } else {
      this.navCtrl.navigateForward('/sinmovilizacion');
    }
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/login'); // Redirige al Login
  }
}
