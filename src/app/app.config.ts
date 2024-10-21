import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient,withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule} from 'ngx-toastr';
import { HttpInterceptor } from '@angular/common/http';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideAnimations(),
    provideToastr(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(
      withFetch() // Enables fetch for better performance and SSR compatibility
    ), 
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ),
    {
      provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true
    }, provideAnimationsAsync()

   ],

};
