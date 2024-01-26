import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class DietService {

    host: string = this.awsHelper.getHost('/category-module');

    constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

    Diet() {
        var path = allURLS['READ_ALL_DIETTYPE'];
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getDietData(dietId) {
        var path = allURLS['READ_ALL_DIETTYPE'] + '/' + dietId;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getSubDiet(dietId,filterValue,page,pageSize) {
        var path;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
            path = allURLS['READ_ALL_SUBDIETTYPE'] + '?page[number]=' + page+'&filter[sequence_diet_id]=' + dietId
          }
          else {
            path = allURLS['READ_ALL_SUBDIETTYPE'] + '?page[number]=' + page +'&filter[sequence_diet_id]=' + dietId+ '&filter[name]=' + encodeURIComponent(filterValue);
          }
          path+='&page[size]='+pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getAllDiet(page,filterValue) {
        // type 
        var path;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
            path = allURLS['READ_ALL_DIETTYPE'] + '?page[number]=' + page;
          }
          else {
            //   '&filter[' + type + ']=' + filterValue
            path = allURLS['READ_ALL_DIETTYPE'] + '?page[number]=' + page + '&search=' + encodeURIComponent(filterValue);
          }
        // var path = allURLS['READ_ALL_DIETTYPE'] + '?page[number]=' + page;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    createDiet(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_DIETTYPE'], formData);
    }
    filterDiet(filterValue: any) {
        // type
        var path;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
          path = allURLS['READ_ALL_DIETTYPE'];
        }
        else {
            // filter[' + type + ']=' + filterValue
           path = allURLS['READ_ALL_DIETTYPE'] + '?search=' + encodeURIComponent(filterValue);
        }
        // var path = allURLS['READ_ALL_DIETTYPE'] + '?filter[name]=' + filterValue;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    filterSubDiet(filterValue: any,dietId,pageSize){
        var path = allURLS['READ_ALL_SUBDIETTYPE'] +'?filter[name]=' + encodeURIComponent(filterValue)+'&filter[sequence_diet_id]='+dietId+'&page[size]='+pageSize;;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    deleteDiet(dietId: any) {
        var path = allURLS['READ_ALL_DIETTYPE'] + '/' + dietId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    createSubDiet(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_SUBDIETTYPE'], formData);
    }
    updateDiet(dietId: any, formData: any) {
        var path = allURLS['READ_ALL_DIETTYPE'] + '/' + dietId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    deleteSubDiet(subdietId: any) {
        var path = allURLS['READ_ALL_SUBDIETTYPE'] + '/' + subdietId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    updateSubDiet(subdietId: any, formData: any) {
        var path = allURLS['READ_ALL_SUBDIETTYPE'] + '/' + subdietId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }

}
