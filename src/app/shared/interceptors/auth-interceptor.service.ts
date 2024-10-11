import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

 private token:any;
 private excludedRoutes:string[]=['login','signup']
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('checkout interceptor working==',this.token);
    const isExludedRoute=this.excludedRoutes.some(url=>req.url.includes(url));
    if(isExludedRoute){
      return next.handle(req);
    }
  const clonedReq=req.clone(
    {
      headers:req.headers.set('Authorization',`Bearer${this.token}`)
    }
  )
  return next.handle(clonedReq);

}

  constructor() { 
   if(sessionStorage){
    this.token=sessionStorage.getItem('jwtToken');
   }

  }
}
