import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConmovilizacionPage } from './conmovilizacion.page';

describe('ConmovilizacionPage', () => {
  let component: ConmovilizacionPage;
  let fixture: ComponentFixture<ConmovilizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConmovilizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
