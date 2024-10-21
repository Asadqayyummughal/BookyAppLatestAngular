import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token:undefined|any;
  constructor(private router:Router) { 
 // this.token=JSON.stringify(sessionStorage.getItem('jwtToken'))
  }

}
