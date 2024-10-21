import { Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser, } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const platformId:Object = inject(PLATFORM_ID);

    let token;

    if (isPlatformBrowser(platformId)) {
        // Only access sessionStorage in a browser context
        token = sessionStorage.getItem('jwtToken');
    }

    if (token) {
        return true; // Allow access
    }

    router.navigate(['login']);
    return false; // Deny access
};
