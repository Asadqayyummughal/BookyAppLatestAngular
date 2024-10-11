import {Component, ElementRef, EventEmitter, Input, input, Output, ViewChild} from '@angular/core';
import { BooksService } from '../sdk/custom/books.service';
import { Observable } from 'rxjs';
import { BehaviorSubject,Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../sdk/custom/toaster.service';
import {provideAnimations } from '@angular/platform-browser/animations';
import {ToastrService } from 'ngx-toastr';
import { ToastContainerDirective } from 'ngx-toastr';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { SharedService } from '../sdk/core/shared.service';
import { SocketService } from '../socket.service';
import { FormsModule } from '@angular/forms';
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
    private  socket_servise:SocketService){ 
    
  this.socket_servise.receiveMessage().subscribe(
    (msg)=>{
      this.messages.push(msg)
    }
  )    
  //   const observable=new Observable<number>(
  //     obsereer=>{
  //       obsereer.next(1);
  //       obsereer.next(2);
  //       obsereer.next(3);
  //       obsereer.complete();
  //     }
  //   )

  //  observable.subscribe(
  //   {
  //     next(val){
  //       console.log('checkout thev alue of sub===',val); 
  //     },
  //     complete(){
  //       console.log('compleed');
        
  //   }
  //   }
    
    

  //  )

   
  //  observable.subscribe(
  //   (val)=>{
  //     console.log('checkout thev alue of second sub===',val);
      
  //   }
  //  )  


  // const behaviour_subj=new BehaviorSubject<number>(1);
  // behaviour_subj.subscribe(
  //   (val)=>{
  //     console.log('behSubj1',val);
  //   }
  // )
  // behaviour_subj.next(2);
  // behaviour_subj.next(3);
  // behaviour_subj.subscribe(
  //   (val)=>{
  //     console.log('behSubj2',val);
  //   }
  // )
  // behaviour_subj.next(4);
  // behaviour_subj.next(5);
//   const subject=new Subject<number>();
//   subject.subscribe(
//   (value)=>{
//     console.log('Subject:1',value);
//   }
//   )
// subject.next(1);
// subject.next(2);
// subject.subscribe(value => {
//   console.log('Subject:2', value);
// });
// subject.next(3);
  

// const coldObservable = new Observable<number>(observer => {
//   console.log('Observable execution started');
//   observer.next(Math.random());
//   observer.complete();
// });

// // Subscriber 1
// coldObservable.subscribe(value => console.log('Subscriber 1:', value));

// // Subscriber 2
// coldObservable.subscribe(value => console.log('Subscriber 2:', value));
const hotObservable = new Subject<number>();
// // Subscriber 1
// hotObservable.subscribe(value => console.log('Subscriber 1:', value));
// Emitting values
hotObservable.next(Math.random());
hotObservable.next(Math.random());

// Subscriber 2
// hotObservable.subscribe(value => console.log('Subscriber 2:', value));

// Emitting more values
// hotObservable.next(Math.random());
 }

ngOnInit(){
  this.toast.overlayContainer=this.toastContainer
}

_addNewBook(){
  this.books_service.is_upadated.next(false);
  this.shared.isModalOpen.next(true);
}

deleteBook(_id:string){
   this.books_service.deleteBook(_id).subscribe(
    (res:any)=>{
      console.log('checkout the response of deleteBok',res);
      this.toast.success('Book Deleted Successfully.','congrats!');
      this.books_service.fetchBooks();
    },
    (error:any)=>{
      console.log('Erro occured',error);
      this.toast.error('Something Went Wrong While Delting Book.','congrats')
    }
   )

  
}

updateBook(book:any){
  this.books_service.updated_book.next(book);
  this.books_service.is_upadated.next(true);
}
sendMessage(){
  this.socket_servise.sendMessage(this.message)
  
}
}
