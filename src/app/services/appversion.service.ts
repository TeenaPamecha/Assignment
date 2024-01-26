import { Injectable } from '@angular/core';

import { APIWrapperService } from './api-wrapper.service';
import { AWSHelperService } from './aws4-helper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class AppversionService {

    host: string = this.awsHelper.getHost('/user-module');
    // path: string = '/test/userprofile-module';
    // path: string = '/userprofile-module/user-profile';

    constructor(private APIWrapperService: APIWrapperService, private awsHelper: AWSHelperService) { }

    getAppVersionDetails(Id) {
        var path=allURLS['APP_VERSION']+'?app_type='+Id;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    updateAppVersionDetail(formdata) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['APP_VERSION'], formdata)
    }
}