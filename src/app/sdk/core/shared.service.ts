import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public isModalOpen=new Subject<boolean>();
  constructor() { 
  

  }
}
