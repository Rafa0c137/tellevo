import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  passwordType: string = 'password';  // Variable para controlar el tipo de input
  passwordIcon: string = 'eye-off';   // Variable para controlar el icono

  constructor(public fb: FormBuilder) { 
    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required)  // El formControlName aquí es "contraseña"
    });
  }

  ngOnInit() { }

  Ingresar() {
    if (this.formularioLogin.valid) {
      const { usuario, contraseña } = this.formularioLogin.value;

      console.log('Usuario:', usuario);
      console.log('Contraseña:', contraseña);
    } else {
      console.log('Datos inválidos');
    }
  }

  // Nueva función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';      // Mostrar la contraseña
      this.passwordIcon = 'eye';       // Cambiar el icono a "ojo abierto"
    } else {
      this.passwordType = 'password';  // Ocultar la contraseña
      this.passwordIcon = 'eye-off';   // Cambiar el icono a "ojo cerrado"
    }
  }

}
