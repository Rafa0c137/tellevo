import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-homeconductor',
  templateUrl: './homeconductor.page.html',
  styleUrls: ['./homeconductor.page.scss'],
})
export class HomeconductorPage implements OnInit {

  nombreUsuario: string = '';  

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombre') || 'Usuario'; 
  }


  goToHome() {
    this.navCtrl.navigateRoot('/home'); 
  }
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);  
  }

  navigateToConductor() {
    this.navCtrl.navigateForward('/homeconductor');  
  }

  logout() {
    localStorage.clear();  
    this.navCtrl.navigateRoot('/loginconductor');  
  }
}
