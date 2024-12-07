import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isEditable = true;
  userName?: string; 
  email = ''; 
  birthDate = ''; 

  constructor(private toastController: ToastController, private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('nombre') || 'Usuario no registrado';
    this.email = localStorage.getItem('email') || ''; 
    this.birthDate = localStorage.getItem('birthDate') || 'DD-MM-AAAA';
  }

  volver() {
    this.router.navigate(['/home']);
  }

  guardarCambios() {
   
    if (!this.isEmailValid(this.email)) {
      this.presentToast('Por favor, ingresa un correo electronico valido que contenga "@"');
      return; 
    }
    localStorage.setItem('email', this.email);
    localStorage.setItem('birthDate', this.birthDate);
    this.presentToast('Cambios guardados correctamente');
    this.router.navigate(['/home']);
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
