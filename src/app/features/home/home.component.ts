import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUserEmail: string | null = null;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('currentUser');
    if (this.currentUserEmail) {
      console.log('user:', this.currentUserEmail);
    } else {
      console.log('No se encontró usuario loggeado.');
      this.router.navigate(['/sign-in']);
    }
  }

}
