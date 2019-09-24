import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';
import {MatSelectModule} from "@angular/material/select";
import {CdkTableModule} from '@angular/cdk/table';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {UsersComponent} from './pages';
import {FilterPipe} from "./pipes";
import {UsersResolver} from "./services";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    CdkTableModule
  ],
  providers: [
    UsersResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
