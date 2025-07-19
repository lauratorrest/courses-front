import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './components/initial-content/service/user.service';
import { EmailRequest } from './components/initial-content/interface/email-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUserEmail: string | null = null;
  nameInitial: string | undefined;
  profilePicUrl: string | undefined;

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.currentUserLogic();
    this.loadCurrentUserData();
  }

  private currentUserLogic() {
    this.currentUserEmail = localStorage.getItem('currentUser');
    if (this.currentUserEmail) {
      console.log('user:', this.currentUserEmail);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

  loadCurrentUserData() {
    let emailRequest: EmailRequest = {
      email: String(this.currentUserEmail)
    }
    this.userService.getInitialContentUserData(emailRequest).subscribe(response => {
      if(response.profilePicUrl) {
        this.profilePicUrl = response.profilePicUrl;
      } else {
        this.nameInitial = response.fullName[0];
      }
    });
  }

}
