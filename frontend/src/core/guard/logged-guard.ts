import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { TokenService } from '../services/token-service/token-service';

export const loggedGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.getToken() === null || tokenService.isTokenExpired()) {
    console.log('token null ??? ' + tokenService.getToken());
    console.log('token expired ???' + tokenService.isTokenExpired);
    debugger;
    return router.createUrlTree(['/login']);
  }

  return true;
};
