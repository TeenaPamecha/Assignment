import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  host: string = this.awsHelper.getHost('/chef-module');

  private url: string;

  constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

  getAllChef(page, filterstatusValue, filterValue, sortby, pageSize) {
    // type
    var path;

    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
      path = allURLS['READ_ALL_CHEF'] + '?page[number]=' + page;
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) { } else {
        var value = sortby == 'service1' || sortby == 'duty1' ? 1 : sortby == 'duty2' || sortby == 'service2' ? 2 : 1;
        sortby = sortby == 'service1' || sortby == 'service2' ? 'service' : sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (sortby == 'service' || sortby == 'duty') {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
      }
      if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
        path += '&filter[user.status]=' + filterstatusValue
      }
    }
    else {
      // ?page[number]=' + page + '&filter[' + type + ']=' + filterValue;
      path = allURLS['READ_ALL_CHEF'] + '?page[number]=' + page + '&search=' + encodeURIComponent(filterValue);
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) {

        // path = allURLS['READ_ALL_CHEF'] + '?page[number]=' + page + '&search=' + filterValue + '&sort=' + sortby + '&value=' + value;
      } else {
        var value = sortby == 'service1' || sortby == 'duty1' ? 1 : sortby == 'duty2' || sortby == 'service2' ? 2 : 1;
        sortby = sortby == 'service1' || sortby == 'service2' ? 'service' : sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (sortby == 'service' || sortby == 'duty') {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
        if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
          path += '&filter[user.status]=' + filterstatusValue
        }
      }
    }
    path += '&page[size]=' + pageSize
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  createChef(formData) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_CHEF'], formData);
  }
  getChefData(chefId) {
    var path = allURLS['READ_ALL_CHEF'] + '/' + chefId;
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  filterChef(filterstatusValue, filterValue: any, sortby, pageSize) {
    var path = allURLS['READ_ALL_CHEF'] + '?page[size]=' + pageSize;
    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {

      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) { } else {
        var value = sortby == 'service1' || sortby == 'duty1' ? 1 : sortby == 'duty2' || sortby == 'service2' ? 2 : 0;
        sortby = sortby == 'service1' || sortby == 'service2' ? 'service' : sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (value !== 0) {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
      }
      if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
        if (sortby == "0") {
          path += '&filter[user.status]=' + filterstatusValue;
        } else {
          path += '&filter[user.status]=' + filterstatusValue
        }
      }
    }
    else {
      path = allURLS['READ_ALL_CHEF'] + '?search=' + encodeURIComponent(filterValue);
      // ?filter[' + type + ']=' + filterValue;
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) { } else {
        var value = sortby == 'service1' || sortby == 'duty1' ? 1 : sortby == 'duty1' || sortby == 'service2' ? 2 : 0;
        sortby = sortby == 'service1' || sortby == 'service2' ? 'service' : sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (value !== 0) {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
      }
      if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
        path += '&filter[user.status]=' + filterstatusValue
      }
    }

    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  deleteChef(chefId: any) {
    var path = allURLS['READ_ALL_CHEF'] + '/' + chefId;
    var formData = new FormData();
    var d: any = [1, 2, 3, 4, 5];
    formData.append('_method', 'DELETE');
    formData.append('data1', d);
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  updateChef(chefId: any, formData: any) {
    var path = allURLS['READ_ALL_CHEF'] + '/' + chefId;
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  documentList(chefId) {
    var path  =allURLS['DOCUMENTS'];
    
    if (chefId != 0) {
      path += '?sequence_chef_id='+chefId;
    }
    return this.APIWrapperService.callGetAPI(this.host, path)
  }
  documentUpdate(documents: FormData) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['UPLOAD_DOCUMENTS'], documents)
  }
  verifyChef(chefId, formData) {
    var path = allURLS['READ_ALL_CHEF'] + '/' + chefId + '/verify';
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  verifyService(chefId, formData) {
    var path = allURLS['READ_ALL_CHEF'] + '/' + chefId + '/service-verify';
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  isActive(chefId, formData) {
    var path = allURLS['READ_ALL_CHEF'] + '/' + chefId + '/isactive';
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
}
