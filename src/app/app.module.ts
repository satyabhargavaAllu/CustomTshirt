import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FABRIC_TOKEN} from './common/services/fabric.service';
import {UndoRedoServiceService} from './common/services/undo-redo-service.service';
import{LoadingIndicatorService} from './common/services/loading-indicator.service';
import { NavbarComponent } from './common/navbar/navbar.component';

import {DesignsService} from './common/services/designs.service';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http'


declare let fabric:any;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:FABRIC_TOKEN,
      useValue:fabric
    },
    UndoRedoServiceService,
    LoadingIndicatorService,
    DesignsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
