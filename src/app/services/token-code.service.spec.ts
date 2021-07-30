import { TestBed } from '@angular/core/testing';

import { TokenCodeService } from './token-code.service';

describe('TokenCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenCodeService = TestBed.get(TokenCodeService);
    expect(service).toBeTruthy();
  });
});
