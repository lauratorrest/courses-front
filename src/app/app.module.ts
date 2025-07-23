import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./features/auth/auth.component";
import { SignInComponent } from "./features/auth/components/sign-in/sign-in.component";
import { SignUpComponent } from "./features/auth/components/sign-up/sign-up.component";

import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { AuthInterceptor } from "./utils/service/interceptor/auth-interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './features/profile-settings/profile-settings.component';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModuleModule } from "./utils/modules/shared-module/shared-module.module";
import { CustomFooterComponent } from './utils/components/custom-footer/custom-footer.component';
import { NotFoundComponent } from './utils/components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    SettingsComponent,
    NotFoundComponent,
  ],
  imports: [
    SharedModuleModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatMenuModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

