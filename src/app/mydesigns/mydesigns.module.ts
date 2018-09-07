import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MydesignsRoutingModule} from './mydesigns-routing.module';
import { MydesignsComponent } from './mydesigns.component';
import {DesignedTshirtComponent} from '../common/designed-tshirt/designed-tshirt.component';
import {MyDesignsResolver} from './mydesigns.resolver';
import {SharedModule} from '../shared/shared.module';
import {CurrentDesignResolver} from './currentdesign.resolver';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MydesignsRoutingModule
  ],
  declarations: [MydesignsComponent,DesignedTshirtComponent],
  providers:[MyDesignsResolver,CurrentDesignResolver]
})
export class MydesignsModule { }
