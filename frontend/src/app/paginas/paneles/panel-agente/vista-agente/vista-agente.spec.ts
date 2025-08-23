import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAgente } from './vista-agente';

describe('VistaAgente', () => {
  let component: VistaAgente;
  let fixture: ComponentFixture<VistaAgente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaAgente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaAgente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
