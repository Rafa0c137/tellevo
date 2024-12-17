import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroconductorPage } from './registroconductor.page';

describe('RegistroconductorPage', () => {
  let component: RegistroconductorPage;
  let fixture: ComponentFixture<RegistroconductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroconductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
