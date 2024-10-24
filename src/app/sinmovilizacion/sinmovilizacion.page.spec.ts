import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinmovilizacionPage } from './sinmovilizacion.page';

describe('SinmovilizacionPage', () => {
  let component: SinmovilizacionPage;
  let fixture: ComponentFixture<SinmovilizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SinmovilizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
