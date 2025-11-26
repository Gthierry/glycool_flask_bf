import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userResolverResolver } from './user-resolver-resolver';

describe('userResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
