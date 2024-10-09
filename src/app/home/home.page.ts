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

  /*async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.userImage = e.target.result;
        await this.storage.set('userImage', this.userImage); 
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona una imagen en formato JPG.');
    }
  }*/

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
