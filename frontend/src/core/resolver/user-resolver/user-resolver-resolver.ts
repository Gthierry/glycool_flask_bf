import { ResolveFn } from '@angular/router';

export const userResolverResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
