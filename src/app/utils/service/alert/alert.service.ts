import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  successAlert(title:string, message: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745'
    });
  }

  errorAlert(title:string, errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: errorMessage,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#d33'
    });
  }
}
