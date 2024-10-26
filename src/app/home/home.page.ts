import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

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
    this.navCtrl.navigateRoot('/login'); // Redirige al login
  }
}
