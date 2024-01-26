import { Injectable } from '@angular/core';

import { APIWrapperService } from './api-wrapper.service';
import { AWSHelperService } from './aws4-helper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    host: string = this.awsHelper.getHost('/user-module');
    // path: string = '/test/userprofile-module';
    // path: string = '/userprofile-module/user-profile';

    constructor(private APIWrapperService: APIWrapperService, private awsHelper: AWSHelperService) { }

    getProfileDetails() {
        return this.APIWrapperService.callGetAPI(this.host, allURLS['PROFILE']);
    }
    updatePersonalDetail(register) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['PROFILE'], register)
    }
    uploadedDocumentData() {
        return this.APIWrapperService.callGetAPI(this.host, allURLS['UPLOAD_DOCUMENTS'])
    }
    isAvailableChef(duty) {
        var formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('duty', duty);
        var path = allURLS['CHEF_AVAILABEL'] + 'duty';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    showTermConditon(roleId,type){
        var path=allURLS['TERM_CONDITION']+'?sequence_role_id='+roleId+'&type='+type
        return this.APIWrapperService.callGetAPI(this.host, path)
    }
    updateTermConditon(formData){
        return this.APIWrapperService.callPostAPI(this.host, allURLS['TERM_CONDITION'],formData)
    }
}