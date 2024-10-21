import { Component, Inject, input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BooksService } from '../sdk/custom/books.service';
import { MatDialogActions,MatDialogContent } from '@angular/material/dialog';
import {ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [ MatDialogActions,MatDialogContent ],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {

  constructor(  
    private dialogRef :MatDialogRef<DeleteModalComponent>,
    private book_service:BooksService,
    private toaster:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:{book_id:string}
  ){
   this.dialogRef.afterClosed().subscribe(
    (res:any)=>{
    console.log('chck result after modal closed===>',res);
    }
   )

  }

  modalDel(){
    this.dialogRef.close('Asad');
    this.book_service.deleteBook(this.data.book_id).subscribe(
      (res:any)=>{
        this.toaster.success('Book Deleted Successfully.','congrats!');
        this.book_service.fetchBooks();
      },
      (error:any)=>{
        console.log('Erro occured',error);
        this.toaster.error('Something Went Wrong While Delting Book.','congrats')
      }
     )
    }
    
   
  modelCancel(){
    this.dialogRef.close();
  }
    


}


