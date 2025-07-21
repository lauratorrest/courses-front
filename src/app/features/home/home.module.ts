import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InitialContentComponent } from './components/initial-content/initial-content.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon";
import { SharedModuleModule } from 'src/app/utils/modules/shared-module/shared-module.module';

@NgModule({
  declarations: [
    HomeComponent,
    InitialContentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    SharedModuleModule,
]
})
export class HomeModule { }
