import { TestBed } from '@angular/core/testing';

import { DatosInglesService } from './datos-ingles.service';

describe('DatosInglesService', () => {
  let service: DatosInglesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosInglesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
