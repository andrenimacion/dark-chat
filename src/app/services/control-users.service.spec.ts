import { TestBed } from '@angular/core/testing';

import { ControlUsersService } from './control-users.service';

describe('ControlUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlUsersService = TestBed.get(ControlUsersService);
    expect(service).toBeTruthy();
  });
});
