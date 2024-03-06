import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FailureListComponent} from "./failure-list/failure-list.component";
import {FailureFormularzComponent} from "./formularz/failure-formularz/failure-formularz.component";

const routes: Routes = [
  {path:'',component:FailureListComponent},
  { path: 'dodaj', component: FailureFormularzComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
