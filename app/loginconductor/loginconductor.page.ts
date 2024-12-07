import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-loginconductor',
  templateUrl: './loginconductor.page.html',
  styleUrls: ['./loginconductor.page.scss'],
})
export class LoginconductorPage implements OnInit {

  formularioLogin: FormGroup;
  passwordType: string = 'password';  
  passwordIcon: string = 'eye-off';  
  nombreUsuario: string = 'Usuario';  // Nombre del usuario
  isLoginConductorPage: boolean = true;  // Se asegura de que el botón de "Inicio" solo aparezca en esta página

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
    this.nombreUsuario = localStorage.getItem('nombre') || 'Usuario'; // Asignar el nombre del usuario desde el almacenamiento local
  }

  async requestPermissions() {
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
    }

    const storedUsuario = localStorage.getItem('usuario');
    const storedPassword = localStorage.getItem('password');
    
    if (f.usuario === storedUsuario && f.contraseña === storedPassword) {
      localStorage.setItem('nombre', f.usuario); // Guardamos el nombre del usuario

      const alert = await this.alertController.create({
        message: 'Bienvenido ' + f.usuario + '!',
      });
      await alert.present();
      
      setTimeout(() => {
        alert.dismiss();
      }, 1000);

      // Redirigir a homeconductor
      this.navCtrl.navigateRoot('/homeconductor');  // Aquí redirigimos a 'homeconductor'
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

  // Función para navegar a otras páginas
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  navigateToConductor() {
    this.navCtrl.navigateForward('/conductor');
  }

  // Función para cerrar sesión
  logout() {
    localStorage.clear();  // Limpia el almacenamiento local
    this.navCtrl.navigateRoot('/loginconductor');  // Redirige a la página de login
  }

  // Función para navegar al Home desde el side menu
  goToHome() {
    this.navCtrl.navigateRoot('/homeconductor');  // Redirige al homeconductor
  }
}
