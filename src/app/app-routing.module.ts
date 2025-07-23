import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { SignInComponent } from './features/auth/components/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/components/sign-up/sign-up.component';
import { SettingsComponent } from './features/profile-settings/profile-settings.component';
import { NotFoundComponent } from './utils/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent }
    ]
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
