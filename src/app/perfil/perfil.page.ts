import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; // Asegúrate de importar Router

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  isEditable = true; // Permitir la edición de los campos
  userName?: string; // Inicializa sin valor
  email = ''; // Valor inicial del correo electrónico
  birthDate = ''; // Valor inicial de la fecha de nacimiento

  constructor(private toastController: ToastController, private router: Router) {} // Inyecta Router

  ngOnInit() {
    // Recuperar el nombre de usuario desde localStorage
    this.userName = localStorage.getItem('nombre') || 'Usuario no registrado'; // Asignar valor por defecto si no existe
    this.email = localStorage.getItem('email') || ''; // Recupera el correo
    this.birthDate = localStorage.getItem('birthDate') || ''; // Recupera la fecha de nacimiento
  }

  volver() {
    this.router.navigate(['/home']); // Redirigir al home
  }

  guardarCambios() {
    // Validar el correo electrónico
    if (!this.isEmailValid(this.email)) {
      this.presentToast('Por favor, ingrese un correo electrónico válido que contenga "@"');
      return; // No continuar si el correo no es válido
    }

    // Guardar el correo electrónico y la fecha de nacimiento en localStorage
    localStorage.setItem('email', this.email);
    localStorage.setItem('birthDate', this.birthDate);

    // Mostrar un mensaje de confirmación
    this.presentToast('Cambios guardados correctamente');

    // Redirigir a la página de inicio
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }

  isEmailValid(email: string): boolean {
    return email.includes('@'); // Verifica que el correo contenga '@'
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
