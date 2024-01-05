import { TestBed } from '@angular/core/testing';

import { IdProductosService } from './id-productos.service';

describe('IdProductosService', () => {
  let service: IdProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
