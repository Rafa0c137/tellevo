import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  formularioLogin: FormGroup;
  passwordType: string = 'password';  
  passwordIcon: string = 'eye-off';  
  userImage: string | null = null;

  constructor(
    public fb: FormBuilder, 
    public alertController: AlertController, 
    private navCtrl: NavController,
    private storage: Storage
  ) { 
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)  
    });
  }

  async ngOnInit() { 
    await this.storage.create();
    this.loadImage();
  }

  async loadImage() {
    this.userImage = await this.storage.get('userImage');
  }

  async handleResponse(hasTransport: boolean) {
    await this.storage.set('hasTransport', hasTransport);
    if (hasTransport) {
      this.navCtrl.navigateForward('/programar-viaje');
    } else {
      this.navCtrl.navigateForward('/buscar-transporte');
    }
  }

  logout() {
    this.navCtrl.navigateRoot('/login');
    this.alertController.create({
      message: 'Sesion cerrada',
    }).then(alert => alert.present());
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }
}
