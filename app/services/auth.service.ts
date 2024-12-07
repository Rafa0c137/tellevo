import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Retorna true si hay un usuario guardado en localStorage
  }

  login(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  logout() {
    localStorage.removeItem('user');
  }
}
