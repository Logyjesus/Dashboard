import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[]; // ['admin'] مثلاً
  const userRole = localStorage.getItem('role');

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/unauthorized']); // لو مش مصرح له
  return false;
};

