import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../sdk/custom/users.service';
import { ToasterService } from '../sdk/custom/toaster.service';
import { ToastrService } from 'ngx-toastr';
import { json } from 'stream/consumers';
import { JsonPipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl:'./login.component.html',
  styleUrl: './login.component.scss',
  providers:[]

})
export class LoginComponent {
  constructor(
  private user_service:UsersService,
  private toast:ToastrService,
  public router:Router ,
  public auth_servise:AuthService
){
  }
  model = {email: '',password:"" };
  submitForm(loginData:FormData|any){    
    this.user_service.loginUser(loginData).subscribe(
      (resp:any)=>{ 
        this.toast.success(resp.message);
        sessionStorage.setItem('jwtToken',JSON.stringify(resp));
        this.router.navigateByUrl('bookList')
      },
      (error)=>{
        console.log('error in logged in user==>',error);
        this.toast.error(error.error.message)
        
      }
    )
  }

}
