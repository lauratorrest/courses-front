import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CustomFooterComponent } from '../../components/custom-footer/custom-footer.component';



@NgModule({
  declarations: [
    NavBarComponent,
    CustomFooterComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    NavBarComponent,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    CustomFooterComponent
  ]
})
export class SharedModuleModule { }
