import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../utils/service/user/user.service';
import { EmailRequest, UpdateProfilePicRequest, UpdateUserDetailsRequest } from 'src/app/utils/interface/user-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailedDataResponse } from 'src/app/utils/interface/user-info-response';
import { AlertService } from 'src/app/utils/service/alert/alert.service';
import { FilesService } from 'src/app/utils/service/files/files.service';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentUserEmail: string | null = null;
  profilePictureUrl: string | undefined;
  nameInitial: string | undefined;
  userInfoIsLoading: boolean = false;
  savingIsLoading: boolean = false;
  profileInfoForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private userService: UserService, 
    private alertService: AlertService,
    private fileService: FilesService){}

  ngOnInit(): void {
    this.currentUserLogic();
    this.buildForm();
    this.loadCurrentUserData();
  }

  private currentUserLogic() {
    this.currentUserEmail = localStorage.getItem('currentUser');
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
      this.nameInitial = response.fullName[0];
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

    if(response.profilePictureUrl){
      this.profilePictureUrl = Constants.CLOUDINARY_PREFIX + response.profilePictureUrl;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      if (!allowedExtensions.some(ext => file.name.toLocaleLowerCase().endsWith(ext))) {
        this.alertService.errorAlert('Error de archivo', 'Solo se pueden subir archivos de tipo imagen.');
      }

      this.fileService.uploadFile(file).subscribe({
        next: (response) => {
          let updateProfilePicRequest: UpdateProfilePicRequest = {
            email: String(localStorage.getItem('currentUser')),
            profilePictureUrl: response.fileUrl
          }

          this.userService.uploadUserProfilePicUrl(updateProfilePicRequest).subscribe({
            next: (response2) => {
              this.profilePictureUrl = Constants.CLOUDINARY_PREFIX + response.fileUrl;
              this.alertService.successAlert('Foto actualizada con éxito.');
            },
            error: (error) => {
              let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
              this.alertService.errorAlert('Error', errorMessage);
            }
          });
        },
        error: (error) => {
          let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
          this.alertService.errorAlert('Problema', errorMessage);
        }
      });
    }
  }

  updateProfileInfo() {
    this.savingIsLoading = true;
    
    let updateRequest: UpdateUserDetailsRequest = {
      email: String(localStorage.getItem('currentUser')),
      fullName: this.profileInfoForm.controls['fullName'].value,
      webPageUrl: this.profileInfoForm.controls['webPageUrl'].value,
      linkedInUrl: this.profileInfoForm.controls['linkedInUrl'].value,
      youtubeChannelUrl: this.profileInfoForm.controls['youtubeChannelUrl'].value,
      facebookUrl: this.profileInfoForm.controls['facebookUrl'].value,
      instagramUrl: this.profileInfoForm.controls['instagramUrl'].value,
      profession: this.profileInfoForm.controls['profession'].value,
      aboutMe: this.profileInfoForm.controls['aboutMe'].value
    }

    this.userService.updateUserDetailedData(updateRequest).subscribe({
      next: (response) => {
        this.alertService.successAlert('Tu información fue actualizada.');
      },
      error: (error) => {
        let errorMessage: string = error.error?.message || 'Ocurrió un error inesperado';
        this.alertService.errorAlert('Error al iniciar sesión', errorMessage);
      }
    });

    this.savingIsLoading = false;
  }

  logout() {
    this.router.navigate(['/auth/sign-in']);
  }

}
