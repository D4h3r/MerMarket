import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDetallesPage } from './registro-detalles.page';

describe('RegistroDetallesPage', () => {
  let component: RegistroDetallesPage;
  let fixture: ComponentFixture<RegistroDetallesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
