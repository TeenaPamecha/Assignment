import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {

  host: string = this.awsHelper.getHost('/category-module');

  private url: string;

  constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

  getAllCuisine(page,filterValue,pageSize) {
    var path = allURLS['READ_ALL_CUISINE'] + '?page[number]=' + page+'&page[size]='+pageSize;
    if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
    }else{
      path +='&filterValue='+filterValue;
    }
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  getCuisionData(cuisineId){
    var path = allURLS['READ_ALL_CUISINE'] + '/' + cuisineId;
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  createCuisine(formData) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_CUISINE'], formData);
  }
  filterCuisine(filterValue: any,pageSize) {
    var path = allURLS['READ_ALL_CUISINE'] + '?filter[name]=' + encodeURIComponent(filterValue)+'&page[size]='+pageSize;
    return this.APIWrapperService.callGetAPI(this.host, path);
  }
  deleteCuisine(cuisineId: any) {
    var path = allURLS['READ_ALL_CUISINE'] + '/' + cuisineId;
    var formData = new FormData();
    formData.append('_method', 'DELETE');
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
  updateCuisine(cuisineId: any, formData: any) {
    var path = allURLS['READ_ALL_CUISINE'] + '/' + cuisineId;
    return this.APIWrapperService.callPostAPI(this.host, path, formData);
  }
}
