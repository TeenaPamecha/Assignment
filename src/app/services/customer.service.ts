import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    host: string = this.awsHelper.getHost('/customer-module');

    private url: string;

    constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

    getAllCustomer(page, filterValue, pageSize) {
        var path = allURLS['READ_ALL_CUSTOMER'] + '?page[number]=' + page;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
        } else {
            path += '&search=' + encodeURIComponent(filterValue);
        }
        path += '&page[size]=' + pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    createCustomer(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_CUSTOMER'], formData);
    }
    filterCustomer(filterValue: any,pageSize) {
        var path = allURLS['READ_ALL_CUSTOMER']+ '?page[size]=' + pageSize;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
        }
        else {
            path += '&search=' + encodeURIComponent(filterValue);
        }
       
        // var path = allURLS['READ_ALL_CUSTOMER'] + '?filter[first_name]=' + filterValue;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getCustomerData(customerId) {
        var path = allURLS['READ_ALL_CUSTOMER'] + '/' + customerId;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    deleteCustomer(customerId: any) {
        var path = allURLS['READ_ALL_CUSTOMER'] + '/' + customerId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    updateCustomer(customerId: any, formData: any) {
        var path = allURLS['READ_ALL_CUSTOMER'] + '/' + customerId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    dishImageUpload(dishImages: FormData, dishId) {
        var path = allURLS['UPLOAD_DISH_IMAGES'] + dishId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, dishImages)
    }

    dishImageDelete(formData: any, dishId) {
        var path = allURLS['UPLOAD_DISH_IMAGES'] + dishId + '/images';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    approveCustomerIdService(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['CHEF_SERVICE'], formData);
    }

    serviceRequest(sequence_service_id) {
        var formData = new FormData();
        formData.append('sequence_service_id', sequence_service_id);
        var path = allURLS['CHEF_AVAILABEL'] + 'service';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }




}
