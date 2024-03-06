import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FailureListComponent} from "./failure-list/failure-list.component";

const routes: Routes = [
  {path:'',component:FailureListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
