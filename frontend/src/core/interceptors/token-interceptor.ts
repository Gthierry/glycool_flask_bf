import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/authentification/auth-service';
import { TokenService } from '../services/token-service/token-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  // Si le token n'est pas expiré on ajoute le token dans le header de la requête
  if (!tokenService.isTokenExpired()) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenService.getToken()}`,
        },
      }),
    );
  }
  // Si le token est expiré on n'ajoute pas le token dans le header de la requête
  authService.logout();
  return next(req);
};
