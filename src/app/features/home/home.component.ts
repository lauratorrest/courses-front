import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../utils/service/user/user.service';
import { EmailRequest } from '../../utils/interface/user-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUserEmail: string | null = null;

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.currentUserLogic();
    this.loadCurrentUserData();
  }

  private currentUserLogic() {
    this.currentUserEmail = localStorage.getItem('currentUser');
    if (!this.currentUserEmail) {
      this.logout();
    }
  }

  loadCurrentUserData() {
    let emailRequest: EmailRequest = {
      email: String(this.currentUserEmail)
    }
    this.userService.getInitialContentUserData(emailRequest).subscribe(response => {
      
    });
  }

  logout() {
    this.router.navigate(['/auth/sign-in']);
  }

}
