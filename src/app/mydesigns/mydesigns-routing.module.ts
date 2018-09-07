import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MydesignsComponent } from './mydesigns.component';
import { MyDesignsResolver } from './mydesigns.resolver';
import {MainComponent} from '../main/main.component';
import {CurrentDesignResolver} from './currentdesign.resolver';

const routes: Routes = [
  {
    path: '',
    component: MydesignsComponent,
    resolve: {
      mydesigns: MyDesignsResolver
    }
  },
  {
   path:':id',
   component:MainComponent,
    resolve: {
      editDesign: CurrentDesignResolver
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MydesignsRoutingModule { }
