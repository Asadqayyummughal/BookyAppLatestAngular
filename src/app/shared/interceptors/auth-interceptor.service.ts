import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpRequest,HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

 private token:any;
 private excludedRoutes:string[]=['login','signup','bookList']
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    alert('get cllled interceptor')
    const isExludedRoute=this.excludedRoutes.some(url=>req.url.includes(url));
    console.log('isExludedRoute',isExludedRoute);
    
    if(isExludedRoute){
      console.log('isExludedRoute',isExludedRoute);
      return next.handle(req);
      
    }
  const clonedReq=req.clone(
    {
      headers:req.headers.set('Authorization',`${this.token}`)
      
    }
  )
  console.log('check cloned request==>',clonedReq);
  
  return next.handle(clonedReq);

}

  constructor() { 
   if(sessionStorage){
    this.token=sessionStorage.getItem('jwtToken');
   }

  }
}
