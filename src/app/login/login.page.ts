import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
    this.requestPermissions();
  }

  async requestPermissions(){
    const locPermission = await Geolocation.requestPermissions();
    console.log('Permisos de ubicación otorgados:', locPermission);
  }

  async Ingresar() {
    const f = this.formularioLogin.value;
    
    if (!f.usuario || !f.contraseña) {
      const alert = await this.alertController.create({
        message: 'Por favor, complete todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }const storedUsuario = localStorage.getItem('usuario');
    const storedPassword = localStorage.getItem('password');
   if (f.usuario === storedUsuario && f.contraseña === storedPassword) {
      localStorage.setItem('nombre', f.usuario);
  const alert = await this.alertController.create({
        message: 'Bienvenido ' + f.usuario + '!',
      });
      await alert.present();
      setTimeout(() => {
        alert.dismiss();
      }, 1000);
      this.navCtrl.navigateRoot('/preguntar');
    } else {
      const alert = await this.alertController.create({
        message: 'El Usuario o Contraseña son incorrectos',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';      
      this.passwordIcon = 'eye';       
    } else {
      this.passwordType = 'password';  
      this.passwordIcon = 'eye-off';   
    }
  }
}
