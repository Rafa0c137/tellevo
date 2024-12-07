// registroconductor.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registroconductor',
  templateUrl: './registroconductor.page.html',
  styleUrls: ['./registroconductor.page.scss'],
})
export class RegistroconductorPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.formularioRegistro = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", [Validators.required, Validators.minLength(4)]),
      'confirmacionPassword': new FormControl("", Validators.required)
    });
  }

  ngOnInit() { }

  async guardar() {
    const f = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid || f.password !== f.confirmacionPassword) {
      const alert = await this.alertController.create({
        message: 'Por favor, rellene todos los campos correctamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Guardamos el usuario y la contraseña en el almacenamiento local
    localStorage.setItem('usuario', f.usuario);
    localStorage.setItem('password', f.password);

    const alert = await this.alertController.create({
      message: '¡Registro exitoso!',
      buttons: ['Aceptar']
    });
    await alert.present();

    // Regresamos a la página de login
    this.irLogin();
  }

  irLogin() {
    this.navCtrl.navigateBack('/loginconductor');  // Regresa a la página de login del conductor
  }
}
