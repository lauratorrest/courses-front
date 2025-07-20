import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) { }

  successAlert(title:string, message: string, path?: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745'
    }).then(() => {
      if (path) {
        this.router.navigate([path]);
      }
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
