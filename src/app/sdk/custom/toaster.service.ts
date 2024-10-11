import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr:ToastrService) { }

  showSuccess(message:string) {
    console.log('show success get called check now');
    
    this.toastr.success('Congrats!',message);
  }

  showError(error:string) {
    this.toastr.error( 'Oops!',error);
  }

  showWarning() {
    this.toastr.warning('This is a warning', 'Be careful!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
}
