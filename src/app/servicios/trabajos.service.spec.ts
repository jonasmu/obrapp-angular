import { TestBed } from '@angular/core/testing';

import { TrabajosService } from './trabajos.service';

describe('TrabajosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrabajosService = TestBed.get(TrabajosService);
    expect(service).toBeTruthy();
  });
});
