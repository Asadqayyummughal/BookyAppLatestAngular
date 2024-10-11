import { Injectable } from '@angular/core';
import { BookyConfig } from '../booky.configs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public limit=15;
  public books_path=BookyConfig.getPath()+"/books/";
  public books:Array<any>=[];
  public updated_book=new Subject();
  public is_upadated=new BehaviorSubject(false)

  constructor(private http:HttpClient) { 
    this.fetchBooks();
  }

  fetchBooks()
  {
    let queryParams:any={
      page:1,
      limit:15
    }
    let params=new HttpParams();
    Object.keys(queryParams).forEach(
      (key)=>{
        params=params.set(key,queryParams[key]);
      }
    );
     this.http.get(`${this.books_path}/fetchBooks`,{params}).subscribe(
      (resp:any)=>{
        // console.log('books',resp);
        this.books=resp.books;
      },
      (error)=>{
        console.log('error in getting books====>',error);
      },
      
    )
     
    
  }
  AddBook(book:unknown):Observable<any>{
    return this.http.post(`${this.books_path}addBook`,book)
  }
  _updateBook(update:any,book_id:string){
    return  this.http.put(`${this.books_path}${book_id}`,update)

  }
  deleteBook(id:string){
  let params=new HttpParams().set('id',id);  
  return  this.http.delete(`${this.books_path}${id}`)
  }
  
  
}
