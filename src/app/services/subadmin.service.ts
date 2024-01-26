import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
  providedIn: 'root'
})
export class SubadminService {
  host: string = this.awsHelper.getHost('/subadmin-module');

  constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }
  getAllUser(filterValue,page,pageSize) {
    // type
    var path = allURLS['READ_ALL_USER'] + '?page[number]=' + page + '&page[size]=' + pageSize

    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
     
    }
    else {
      // ?page[number]=' + page + '& '&filter[' + type + ']=' + filterValue;
      path += '&search=' + encodeURIComponent(filterValue);
    }
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  getAllPermission() {
    // type
    return this.APIWrapperService.callGetAPI(this.host, allURLS['READ_ALL_PERMISSION']);
  }
  createUser(formData) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_USER'], formData);
  }
  getUserData(userId) {
    var path = allURLS['READ_ALL_USER'] + '/' + userId;
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  filterUser( filterValue: any, pageSize) {
    var path = allURLS['READ_ALL_USER'] + '?page[size]=' + pageSize;
    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
    }
    else {
      path +='&search=' + encodeURIComponent(filterValue);
      // ?filter[' + type + ']=' + filterValue;
    }

    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  deleteUser(userId: any) {
    var path = allURLS['READ_ALL_USER'] + '/' + userId;
    var formData = new FormData();
    formData.append('_method', 'DELETE');
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  updateUser(userId: any, formData: any) {
    var path = allURLS['READ_ALL_USER'] + '/' + userId;
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  isActive(userId, formData) {
    var path = allURLS['READ_ALL_USER'] + '/' + userId + '/isactive';
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
}
