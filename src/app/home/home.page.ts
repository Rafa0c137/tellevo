import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  
  

  formularioLogin: FormGroup;

  passwordType: string = 'password';  
  passwordIcon: string = 'eye-off';  

  constructor(
    public fb: FormBuilder, 
    public alertController: AlertController, 
    private navCtrl: NavController  
  ) { 
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)  
    });
  }

  ngOnInit() { 
  }


  logout() {
    this.navCtrl.navigateRoot('/login');
    this.alertController.create({
      message: 'Sesion cerrada exitosamente',
      buttons: ['Aceptar']
    }).then(alert => alert.present());
  }
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

}