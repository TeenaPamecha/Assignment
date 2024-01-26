import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, AsyncPipe } from "@angular/common";
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { ToastrModule } from "ngx-toastr";

import { MaterialModule } from './material.module';

import { AuthInterceptorService } from './auth-interceptor.service';
import { GlobalErrorHandler } from './global-error-handler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { MainModule } from './main/main.module';

import { DashboardService } from './services/dashboard.service';

import { environment } from '../environments/environment';

import { AppversionService } from './services/appversion.service';

const googleMapsParams = {
  apiKey: environment.GOOGLE_MAPS_API_KEY, libraries: ['places'],
  apiVersion: 'quarterly'
  // language: 'en',
  // region: 'DE'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    CountdownTimerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),
    MainModule
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'en-GB'
    },
    AsyncPipe,
    AppversionService,
    DashboardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]

})
export class AppModule { }
