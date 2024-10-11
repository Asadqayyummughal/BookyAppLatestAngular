import { Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../auth.service';
export const authGuard: CanActivateFn = (route, state) => {
 let router=new Router();
 let auth_servise=Inject(AuthService);
// const router=new myRouter();
let token=sessionStorage.getItem('jwtToken');
  if(token){
   return true;
  }

router.navigate(['login'])
return false; 

};
