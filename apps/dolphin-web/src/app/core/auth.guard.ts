import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from './auth.facade';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);
  return auth.state().isAuthenticated ? true : router.createUrlTree(['/login']);
};

export const otpGuard: CanActivateFn = () => {
  const auth = inject(AuthFacade);
  const router = inject(Router);
  const state = auth.state();
  return state.isOtpPending || state.isAuthenticated ? true : router.createUrlTree(['/login']);
};
