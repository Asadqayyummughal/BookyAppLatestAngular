import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UsersService } from '../sdk/custom/users.service';
import { ToasterService } from '../sdk/custom/toaster.service';
import { faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  faEye =faEye;
  faEyeSlash=faEyeSlash
public signup_form:FormGroup;
hidePassword: boolean = true;
  constructor(
    private fb:FormBuilder,
    private user_serice:UsersService,
    private toster:ToasterService,
    private router:Router
  ){
    this.signup_form=this.fb.group(
      {
        user_name:['',[Validators.required,Validators.minLength(8)]],
        email:['',[Validators.email,Validators.required]],
        password:['',[Validators.required,Validators.minLength(8)]],
        confirm_password:['',[Validators.required]]
      },{validators:this.crossFieldValidtion}
    )

  }


  signupUser(){
    this.user_serice.registerUser(this.signup_form.value).subscribe(
      (resp:any)=>{
        this.toster.showSuccess(resp.message);
        this.signup_form.reset();
        this.router.navigateByUrl('/login')
        
      },
      (error:any)=>{
        console.log('some thing went wrong in signing in',error);
        this.toster.showError(error.error);   
      }
    )    
  }
  
  crossFieldValidtion(form:FormGroup){
   return (form.get('password')?.value==form.get('confirm_password')?.value?null:{mismatch:true});
  }
  togglePassword(){
    this.hidePassword=!this.hidePassword;
  }


  
}
