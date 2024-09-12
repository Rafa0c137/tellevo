// home.page.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuarioNombre: string = '';

  constructor() {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      const usuario = JSON.parse(usuarioString);
      this.usuarioNombre = usuario.nombre;
    }
  }
}
