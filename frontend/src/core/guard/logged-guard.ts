import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token-service/token-service';

export const loggedGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService)

  if(tokenService.getToken())
  {
    return true
  }
  return false;
};
