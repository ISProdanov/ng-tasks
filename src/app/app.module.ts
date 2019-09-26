import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {CdkTableModule} from '@angular/cdk/table';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FilterPipe} from './pipes';
import {UsersResolver} from './services';
import {ErrorComponent, UsersComponent} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FilterPipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    CdkTableModule,
    MatCardModule
  ],
  providers: [
    UsersResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
