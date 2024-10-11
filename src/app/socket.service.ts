import { Injectable } from '@angular/core'
import {Socket,io} from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket
  constructor(private http:HttpClient) { 
   this.socket=io('http://localhost:3000')
  }

  sendMessage(
     message:string
  ){
    this.socket.emit('message',message)
  }
   receiveMessage():Observable<string>{
    return new Observable(
    (observer)=>{
      this.socket.on('message',(data)=>{
        observer.next(data);
      })
    }
    )
   }
}
