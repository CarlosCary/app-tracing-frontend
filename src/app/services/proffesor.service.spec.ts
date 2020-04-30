import { TestBed } from '@angular/core/testing';

import { ProffesorService } from './proffesor.service';

describe('ProffesorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProffesorService = TestBed.get(ProffesorService);
    expect(service).toBeTruthy();
  });
});
