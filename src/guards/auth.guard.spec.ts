import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard] // Provee el AuthGuard
    });

    guard = TestBed.inject(AuthGuard); // Inyecta el AuthGuard
    router = TestBed.inject(Router); // Inyecta el Router
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access to the route if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'nombre') {
        return 'user'; // Simula un usuario autenticado
      }
      return null;
    });

    const result = guard.canActivate(null, null);
    expect(result).toBeTrue(); // Verifica que el acceso se permite
  });

  it('should deny access to the route if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simula un usuario no autenticado

    const navigateSpy = spyOn(router, 'navigate'); // Espía la función de navegación

    const result = guard.canActivate(null, null);
    expect(result).toBeFalse(); // Verifica que el acceso se deniega
    expect(navigateSpy).toHaveBeenCalledWith(['/login']); // Verifica que redirige a /login
  });
});
