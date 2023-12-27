import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const user=userService.getUser();
  if(user.token)
  {
    return true;
  }
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
  

  return false;
};
