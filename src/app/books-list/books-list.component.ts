import {Component, ElementRef, EventEmitter, Input, input, Output, ViewChild} from '@angular/core';
import { BooksService } from '../sdk/custom/books.service';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import {provideAnimations } from '@angular/platform-browser/animations';
import {ToastrService } from 'ngx-toastr';
import { ToastContainerDirective } from 'ngx-toastr';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { SharedService } from '../sdk/core/shared.service';
import { SocketService } from '../socket.service';
import { FormsModule } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule,BookModalComponent,FormsModule],
  providers:[provideAnimations()],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  @ViewChild(ToastContainerDirective,{static: true})
  toastContainer: ToastContainerDirective|undefined;
  @Output() dataEmitter=new EventEmitter();
  domain_url='http://localhost:3000/';
  public books:Array<any>=[];
  public messages:Array<string>=[];
  public message:string='';
  constructor(
    public books_service:BooksService,
    private toast:ToastrService,
    private shared:SharedService,
    private  socket_servise:SocketService,
    private router:Router,
    private mat_dailog:MatDialog){ 
    
  this.socket_servise.receiveMessage().subscribe(
    (msg)=>{
      this.messages.push(msg)
    }
  )    
 
 }

ngOnInit(){
  this.toast.overlayContainer=this.toastContainer
}

_addNewBook(){
  this.mat_dailog.open(
    BookModalComponent,
    {
      data:{
        updateModal:false,
        book:[]
      }
    }
  )
}
_logOutUser(){
  //remove session
  this.router.navigateByUrl('login')
}
deleteBook(_id:string,enterAnimationDuration:string,exitAnimationDuration:string){
  this.mat_dailog.open(
    DeleteModalComponent,
    {
        data:{
          book_id:_id
        }
      }
  )
}

updateBook(book:any){
  this.books_service.updated_book.next(book);
  this.mat_dailog.open(
    BookModalComponent,
    {
      data:{
        updateModal:true,
        book:book
      }
    }
  )
}
sendMessage(){
  this.socket_servise.sendMessage(this.message);
}
}
