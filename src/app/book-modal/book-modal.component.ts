import { Component, EventEmitter, Inject, Input, input, Output } from '@angular/core';
import { SharedService } from '../sdk/core/shared.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../sdk/custom/books.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss'
})
export class BookModalComponent {
  isModalOpen:boolean=false;
  book_form:FormGroup;
  selectedFile: File | null = null;
  is_updated:boolean=false;

  constructor(
    private shared:SharedService,
    private form_builder:FormBuilder,
    public book_service:BooksService,
    private toaster_servise:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef :MatDialogRef<BookModalComponent>,
  ){
    this.is_updated=this.data.updateModal;
    console.log('check mat dialiog data',this.data);
    
  
    this.shared.isModalOpen.subscribe(
      (val:boolean)=>{
        this.isModalOpen=val;
      }
    )

    this.book_form=this.form_builder.group(
      {
        name:['',Validators.required],
        price:['',Validators.required],
        author:['',Validators.required],
        company:['',Validators.required]
      }
    )
   
    // this.book_service.updated_book.subscribe(
    //   (upBook:any)=>{
    //     console.log('check boook=====>',upBook);
        
      
    //     // this.isModalOpen=true;
    //   }
    // )
    // this.book_service.is_upadated.subscribe(
    //   (val)=>{  
    //     this.is_updated=val;
    //   }
    // )
    this.book_form.patchValue(data.book);
    console.log('check file path====>',data.book.file_path );
    
    this.book_form.patchValue({bookImage:data.book.file_path });
 
  }
  _addNewBook(update?:boolean){
    console.log('check book===>',this.book_form.value);
    this.shared.isModalOpen.next(false);
    if(this.book_form.valid){
      const formData=new FormData();
            formData.append('name', this.book_form.get('name')?.value);
            formData.append('price', this.book_form.get('price')?.value);
            formData.append('author', this.book_form.get('author')?.value);
            formData.append('company', this.book_form.get('company')?.value);
            console.log('chck form data===========>',formData);
            
            if (this.selectedFile) {
              formData.append('bookImage', this.selectedFile, this.selectedFile.name);
            }
            if(!update){
              this.book_service.AddBook(formData).subscribe(
                (resp)=>{
                  this.dialogRef.close();
                  console.log('chcout the response ==>',resp);
                  this.toaster_servise.success('congrats!','Book Added successfully');
                  this.book_service.fetchBooks();
                },
                (error)=>{
                  this.dialogRef.close();
                  this.toaster_servise.error('Error','Something')
                  console.log('error occured while adding a book',error) 
                }
              )
            }
            else{
              this.book_service._updateBook(formData,this.data.book._id).subscribe(
                (resp)=>{
                  console.log('chcout the response ==>',resp);
                  this.dialogRef.close();
                  this.toaster_servise.success('congrats!','Book updated successfully');
                  this.book_service.fetchBooks();
                },
                (error)=>{
                  this.dialogRef.close();
                  this.toaster_servise.error('Error',error.message)
                  console.log('error occured while adding a book',error) 
                }
              )

            }
            
    }
  }
  _updateBook(){
    console.log('check book===>',this.book_form.value);
    
   this._addNewBook(true);
  } 

  _onFileSelect($event:InputEvent|any) {
    const file = $event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.book_form.patchValue({bookImage: file.name });
    }
  }


  closeModal(){
    this.dialogRef.close();
  }
}
