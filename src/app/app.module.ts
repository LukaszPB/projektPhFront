import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FailureListComponent } from './failure-list/failure-list.component';
import { FailureElementComponent } from './failure-list/failure-element/failure-element.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { FailureFormularzComponent } from './formularz/failure-formularz/failure-formularz.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    FailureListComponent,
    FailureElementComponent,
    FailureFormularzComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
