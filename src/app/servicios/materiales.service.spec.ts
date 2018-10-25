import { TestBed } from '@angular/core/testing';

import { MaterialesService } from './materiales.service';

describe('MaterialesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialesService = TestBed.get(MaterialesService);
    expect(service).toBeTruthy();
  });
});
