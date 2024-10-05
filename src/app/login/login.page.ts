import { Component, OnInit,ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController,AnimationController,IonCard } from '@ionic/angular';
import { Filesystem } from '@capacitor/filesystem';
import { Geolocation} from '@capacitor/geolocation';

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
    console.log('Permitir ubicacion')
  }

  

  async Ingresar() {
    const f = this.formularioLogin.value;
  
    
    if (!f.usuario || !f.contraseña) {
      const alert = await this.alertController.create({
        message: 'Por favor, ingrese su usuario y contraseña',
        buttons: ['Aceptar']
      });
      await alert.present();
      return; 
    }
  
    const storedUsuario = localStorage.getItem('usuario');
    const storedPassword = localStorage.getItem('password');
  
  
    if (this.formularioLogin.valid && f.usuario === storedUsuario && f.contraseña === storedPassword) {
      localStorage.setItem('nombre', f.nombre);
      const alert = await this.alertController.create({
        message: `Bienvenido ${f.usuario} !`,
        buttons: ['Aceptar']
      });
      await alert.present();
      
      this.navCtrl.navigateRoot('/home');
    } else {
      const alert = await this.alertController.create({
        message: 'Usuario o contraseña incorrectos',
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
