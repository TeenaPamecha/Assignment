import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { UserDataService } from './user-data.service';
import { LOCALE_ID, Inject } from '@angular/core';
@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {
    userData:any;

  constructor(@Inject(LOCALE_ID) protected localeId: string,private userDataService : UserDataService) {
    this.userData=this.userDataService.getUserData();
    this.localeId=this.userData.country_code == '+1' ? 'en-US': this.userData.country_code == '+91' ?
    'en-GB':'';
  }

  transform(): any {
    return this.localeId;
    // const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    // return datePipe.transform(value, pattern);
  }

}