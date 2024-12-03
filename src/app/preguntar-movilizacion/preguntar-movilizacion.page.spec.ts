import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntarMovilizacionPage } from './preguntar-movilizacion.page';

describe('PreguntarMovilizacionPage', () => {
  let component: PreguntarMovilizacionPage;
  let fixture: ComponentFixture<PreguntarMovilizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntarMovilizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
