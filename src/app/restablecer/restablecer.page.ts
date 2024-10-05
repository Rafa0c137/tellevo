import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage {
  formularioRestablecer: FormGroup;

  constructor(
    public fb: FormBuilder,
    private navCtrl: NavController,
    public alertController: AlertController
  ) {
    this.formularioRestablecer = this.fb.group({
      usuario: [''],
      nuevaContraseña: [''],
    });
  }

  async restablecerContrasena() {
    const f = this.formularioRestablecer.value;

    const storedUsuario = localStorage.getItem('usuario');
    if (f.usuario === storedUsuario) {
      localStorage.setItem('password', f.nuevaContraseña);
      
      const alert = await this.alertController.create({
        message: 'Contraseña restablecida con éxito.',
        buttons: ['Aceptar']
      });
      await alert.present();
      
      this.volverALogin();
    } else {
      const alert = await this.alertController.create({
        message: 'Usuario no encontrado.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  volverALogin() {
    this.navCtrl.navigateBack('/login');
  }
}
