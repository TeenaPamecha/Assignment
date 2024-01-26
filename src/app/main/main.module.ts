import { NgModule,LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from '../material.module';
import { ToastrModule } from "ngx-toastr";
// import { ComponentsModule } from './component/components.module';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { MomentAgoPipe } from './moment-ago.pipe';
import {LocalizedDatePipe} from '../services/setting.service';


@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent
    PageLoaderComponent,
    MomentAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports:[
    PageLoaderComponent
  ],
  providers:[
    DatePipe,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    {
      provide: LOCALE_ID,
      deps: [LocalizedDatePipe],
      useFactory: (LocalizedDatePipe) => LocalizedDatePipe.transform()
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class MainModule { }