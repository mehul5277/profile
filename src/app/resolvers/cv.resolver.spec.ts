import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cVResolver } from './cv.resolver';

describe('cVResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cVResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
