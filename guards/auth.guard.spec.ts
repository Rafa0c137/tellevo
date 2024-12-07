import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard] 
    });

    guard = TestBed.inject(AuthGuard); 
    router = TestBed.inject(Router); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access to the route if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if (key === 'nombre') {
        return 'user';
      }
      return null;
    });

    const result = guard.canActivate(null, null);
    expect(result).toBeTrue();
  });

  it('should deny access to the route if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 

    const navigateSpy = spyOn(router, 'navigate');

    const result = guard.canActivate(null, null);
    expect(result).toBeFalse(); 
    expect(navigateSpy).toHaveBeenCalledWith(['/login']); 
  });
});
