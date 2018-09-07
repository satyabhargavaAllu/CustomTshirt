import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{SharedModule} from './shared/shared.module';
import {MainComponent} from './main/main.component';
import {MydesignsModule} from './mydesigns/mydesigns.module';

const routes: Routes = [ 
  {path:'',component:MainComponent} ,
  {path:'mydesigns',loadChildren:()=>MydesignsModule} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
