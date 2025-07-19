import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InitialContentComponent } from './components/initial-content/initial-content.component';

@NgModule({
  declarations: [
    HomeComponent,
    InitialContentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
