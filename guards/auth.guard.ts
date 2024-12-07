// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('nombre') !== null; // Verifica si el usuario está autenticado

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado
      return false;
    }
    return true; // Permite el acceso si está autenticado
  }
}
