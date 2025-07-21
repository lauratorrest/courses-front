import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../utils/service/user/user.service';
import { EmailRequest } from 'src/app/utils/interface/email-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailedDataResponse } from 'src/app/utils/interface/user-info-response';

@Component({
  selector: 'app-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentUserEmail: string | null = null;
  profilePictureUrl: string | undefined;
  userInfoIsLoading: boolean = false;
  savingIsLoading: boolean = false;
  profileInfoForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService){}

  ngOnInit(): void {
    this.currentUserLogic();
    this.buildForm();
    this.loadCurrentUserData();
  }

  private currentUserLogic() {
    this.currentUserEmail = localStorage.getItem('curseyaCurrentUser');
    if (!this.currentUserEmail) {
      this.logout();
    }
  }

  buildForm() {
    this.profileInfoForm = this.fb.group({
      fullName: ['', Validators.required],
      webPageUrl: [''],
      linkedInUrl: [''],
      youtubeChannelUrl: [''],
      facebookUrl: [''],
      instagramUrl: [''],
      profession: [''],
      aboutMe: ['']
    });
  }

  loadCurrentUserData() {
    this.userInfoIsLoading = true;
    let emailRequest: EmailRequest = {
      email: String(this.currentUserEmail)
    }
    this.userService.getDetailedUserData(emailRequest).subscribe(response => {
      this.setLoadedInfoToForm(response);
      this.userInfoIsLoading = false;
    });
  }

  setLoadedInfoToForm(response: UserDetailedDataResponse) {
    this.profileInfoForm.patchValue({
      fullName: response.fullName || '',
      webPageUrl: response.webPageUrl || '',
      linkedInUrl: response.linkedInUrl || '',
      youtubeChannelUrl: response.youtubeChannelUrl || '',
      facebookUrl: response.facebookUrl || '',
      instagramUrl: response.instagramUrl || '',
      profession: response.profession || '',
      aboutMe: response.aboutMe || ''
    });
  }

  updateProfileInfo() {
    this.savingIsLoading = true;
    
    

    this.savingIsLoading = false;
  }

  logout() {
    this.router.navigate(['/auth/sign-in']);
  }

}
