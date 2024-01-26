import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  host: string = this.awsHelper.getHost('/driver-module');

  private url: string;

  constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

  getAllDriver(page, filterstatusValue, filterValue, sortby, pageSize) {
    var path;
    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
      path = allURLS['READ_ALL_DRIVER'] + '?page[number]=' + page;
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) { } else {
        var value = sortby == 'duty1' ? 1 : sortby == 'duty2' ? 2 : 0;
        sortby = sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (sortby == 'duty') {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
      }
      if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
        path += '&filter[user.driver_status]=' + filterstatusValue
      }
    } else {
      path = allURLS['READ_ALL_DRIVER'] + '?page[number]=' + page + '&search=' + encodeURIComponent(filterValue);
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) {

        // path = allURLS['READ_ALL_CHEF'] + '?page[number]=' + page + '&search=' + filterValue + '&sort=' + sortby + '&value=' + value;
      } else {
        var value = sortby == 'duty1' ? 1 : sortby == 'duty2' ? 2 : 0;
        sortby = sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (sortby == 'duty') {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
        if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
          path += '&filter[user.driver_status]=' + filterstatusValue
        }
      }
    }
    path += '&page[size]=' + pageSize
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  createDriver(formData) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_DRIVER'], formData);
  }
  getAllDistancePrice() {
    return this.APIWrapperService.callGetAPI(this.host, allURLS['DISTANCE_PRICE']);
  }
  createDistancePrice(formData){
    return this.APIWrapperService.callPostAPI(this.host, allURLS['DISTANCE_PRICE'], formData);
  }
  updateDistancePrice(Id: any, formData: any) {
    var path = allURLS['DISTANCE_PRICE'] + '/' + Id;
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  deleteDistancePrice(Id: any) {
    var path = allURLS['DISTANCE_PRICE'] + '/' + Id;
    var formData = new FormData();
    formData.append('_method', 'DELETE');
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  verifyDriver(driverId, formData) {
    var path = allURLS['READ_ALL_DRIVER'] + '/' + driverId + '/verify';
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  getDriverData(driverId) {
    var path = allURLS['READ_ALL_DRIVER'] + '/' + driverId;
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  isActive(driverId, formData) {
    var path = allURLS['READ_ALL_DRIVER'] + '/' + driverId + '/isactive';
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  filterDriver(filterstatusValue, filterValue: any, sortby, pageSize) {
    var path;
    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
      path = allURLS['READ_ALL_DRIVER'] + '?page[number]=' + 1;
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) { } else {
        var value = sortby == 'duty1' ? 1 : sortby == 'duty2' ? 2 : 0;
        sortby = sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (value !== 0) {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
      }
      if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
        if (sortby == "0") {
          path += '&filter[user.driver_status]=' + filterstatusValue;
        } else {
          path += '&filter[user.driver_status]=' + filterstatusValue
        }
      }
    } else {
      path = allURLS['READ_ALL_DRIVER'] + '?search=' + encodeURIComponent(filterValue);
      if (sortby == '0' || sortby == 0 || sortby == null || sortby == undefined) { } else {
        var value = sortby == 'duty1' ? 1 : sortby == 'duty2' ? 2 : 0;
        sortby = sortby == 'duty1' || sortby == 'duty2' ? 'duty' : sortby;
        if (value !== 0) {
          path += '&filter[' + sortby + ']=' + value;
        } else {
          path += '&sort=' + sortby;
        }
      }
      if (filterstatusValue == '0' || filterstatusValue == 0 || filterstatusValue == null || filterstatusValue == undefined) { } else {
        path += '&filter[user.driver_status]=' + filterstatusValue
      }
    }
    path += '&page[size]=' + pageSize
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  updateDriver(driverId: any, formData: any) {
    var path = allURLS['READ_ALL_DRIVER'] + '/' + driverId;
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  deleteDriver(driverId: any) {
    var path = allURLS['READ_ALL_DRIVER'] + '/' + driverId;
    var formData = new FormData();
    formData.append('_method', 'DELETE');
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }




}
