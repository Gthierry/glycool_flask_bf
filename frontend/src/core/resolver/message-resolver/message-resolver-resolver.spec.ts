import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { messageResolverResolver } from './message-resolver-resolver';

describe('messageResolverResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => messageResolverResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
