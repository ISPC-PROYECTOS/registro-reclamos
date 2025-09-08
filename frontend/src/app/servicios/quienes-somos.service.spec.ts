import { TestBed } from '@angular/core/testing';

import { QuienesSomosService } from './quienes-somos.service';

describe('QuienesSomosService', () => {
  let service: QuienesSomosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuienesSomosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
