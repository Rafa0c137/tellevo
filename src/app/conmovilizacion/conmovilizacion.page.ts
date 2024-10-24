import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conmovilizacion',
  templateUrl: './conmovilizacion.page.html',
  styleUrls: ['./conmovilizacion.page.scss'],
})
export class ConmovilizacionPage {
  constructor(private navCtrl: NavController) {}

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  logout() {
  }
}
