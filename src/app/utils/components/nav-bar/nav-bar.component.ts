import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailRequest } from '../../interface/email-request';
import { UserService } from '../../service/user/user.service';
import { AlertService } from '../../service/alert/alert.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  currentUserEmail: string | null = null;
  nameInitial: string = "L";
  profilePictureUrl: string | undefined;

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.currentUserLogic();
    this.findBasicUserInfo();
  }

  private currentUserLogic() {
    const user = localStorage.getItem('curseyaCurrentUser');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      this.logout();
      return;
    }
  
    this.currentUserEmail = user;
  }

  findBasicUserInfo() {
    let emailRequest: EmailRequest = {
      email: String(this.currentUserEmail)
    }
    this.userService.getInitialContentUserData(emailRequest).subscribe(
      {
        next: (response) => {
          if(response.profilePictureUrl){
            this.profilePictureUrl = response.profilePictureUrl;
          } else {
            this.nameInitial = response.fullName[0];
          }
        },
        error: (error) => {
          let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
          this.alertService.errorAlert('Problema', errorMessage);
        }
    });
  }

  goToHome() {
    this.router.navigate(['']);
  }

  goToSettings() {
    this.router.navigate(['/profile-settings']);
  }

  logout() {
    this.router.navigate(['/auth/sign-in']);
  }

}
