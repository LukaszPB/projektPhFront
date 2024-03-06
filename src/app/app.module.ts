import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FailureListComponent } from './failure-list/failure-list.component';
import { FailureElementComponent } from './failure-list/failure-element/failure-element.component';

@NgModule({
  declarations: [
    AppComponent,
    FailureListComponent,
    FailureElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
