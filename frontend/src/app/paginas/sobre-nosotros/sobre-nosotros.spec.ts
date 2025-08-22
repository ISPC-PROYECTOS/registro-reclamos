import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosotros } from './sobre-nosotros';

describe('SobreNosotros', () => {
  let component: SobreNosotros;
  let fixture: ComponentFixture<SobreNosotros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreNosotros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreNosotros);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
