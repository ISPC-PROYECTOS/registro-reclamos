import { TestBed } from '@angular/core/testing';

import { Autenticacion } from './autenticacion';

describe('Autenticacion', () => {
  let service: Autenticacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autenticacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
