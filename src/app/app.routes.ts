import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { PagenotefoundComponent } from './pagenotefound/pagenotefound.component';
import { BooksListComponent } from './books-list/books-list.component';
import { authGuard } from './shared/interceptors/guards/auth.guard';
export const routes: Routes = [
    {path:"signup",component:SignupComponent},
    {path:"login",component:LoginComponent},
    {path:"bookList",component:BooksListComponent,canActivate:[authGuard]},
    {path:'',redirectTo:"login",pathMatch:"full"},
    {path:"*",component:PagenotefoundComponent},

];