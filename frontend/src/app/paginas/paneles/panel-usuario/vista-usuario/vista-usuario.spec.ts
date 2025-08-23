import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaUsuario } from './vista-usuario';

describe('VistaUsuario', () => {
  let component: VistaUsuario;
  let fixture: ComponentFixture<VistaUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
