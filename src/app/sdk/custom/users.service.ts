import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookyConfig } from '../booky.configs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public basic_path=BookyConfig.getPath();
  
  constructor(private http:HttpClient) { }
  loginUser(user:any){   
    return this.http.post(BookyConfig.getPath()+'/users/login',user)
  }
  registerUser(user:any){
    console.log('check path====>',this.basic_path);
    return this.http.post(this.basic_path+'/users/signup',user)
  }

}
