import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/Forms';
import{FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MainComponent} from '../main/main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  declarations: [MainComponent],
  exports:[MainComponent]
})
export class SharedModule { }
