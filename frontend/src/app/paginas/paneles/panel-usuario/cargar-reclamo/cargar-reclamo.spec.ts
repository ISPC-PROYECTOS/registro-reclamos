import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarReclamo } from './cargar-reclamo';

describe('CargarReclamo', () => {
  let component: CargarReclamo;
  let fixture: ComponentFixture<CargarReclamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarReclamo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarReclamo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
