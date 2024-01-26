import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    host: string = this.awsHelper.getHost('/category-module');

    private url: string;

    constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

    getAllCategory(page, pageSize, filterValue)  {
        var path;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
            path = allURLS['READ_ALL_CATEGORY'] + '?page[number]=' + page+'&page[size]='+pageSize;;
          }
          else {
            //   '&filter[' + type + ']=' + filterValue;
            path = allURLS['READ_ALL_CATEGORY'] + '?page[number]=' + page + '&filter[name]=' + encodeURIComponent(filterValue) +'&page[size]='+pageSize;
          }
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    Category() {
        var path = allURLS['READ_ALL_CATEGORY'];
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getCategoryData(categoryId){
      var path = allURLS['READ_ALL_CATEGORY'] + '/' + categoryId;
      return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getSubCategory(filterValue,pageSize,page){
        var path=allURLS['READ_ALL_SUBCATEGORY'] + '?page[number]=' + page+"&page[size]="+pageSize;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
            // +'&filter[sequence_category_id]=' + categoryId
          }
          else {
            //   +'&filter[sequence_category_id]=' + categoryId
            path += '&filter[name]=' + encodeURIComponent(filterValue);
          }
          
      return this.APIWrapperService.callGetAPI(this.host, path);
    }
    createCategory(formData) {
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_CATEGORY'], formData);
    }
    createSubCategory(formData){
        return this.APIWrapperService.callPostAPI(this.host, allURLS['READ_ALL_SUBCATEGORY'], formData);
    }
    filterCategory(filterValue: any,pageSize) {
        // type
        
        var path;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
          path = allURLS['READ_ALL_CATEGORY']+'?page[size]='+pageSize;;
        }
        else {
            // filter[' + type + ']=' + filterValue;
           path = allURLS['READ_ALL_CATEGORY'] + '?filter[name]=' + encodeURIComponent(filterValue)+'&page[size]='+pageSize;
        }
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    filterSubCategory(filterValue: any,pageSize){
        var path = allURLS['READ_ALL_SUBCATEGORY'] + '?filter[name]=' + encodeURIComponent(filterValue)+"&page[size]="+pageSize;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    deleteCategory(categoryId: any) {
        var path = allURLS['READ_ALL_CATEGORY'] + '/' + categoryId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    deleteSubCategory(subcategoryId: any) {
        var path = allURLS['READ_ALL_SUBCATEGORY'] + '/' + subcategoryId;
        var formData = new FormData();
        formData.append('_method', 'DELETE');
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    updateCategory(categoryId: any, formData: any) {
        var path = allURLS['READ_ALL_CATEGORY'] + '/' + categoryId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    updateSubCategory(subcategoryId: any, formData: any) {
        var path = allURLS['READ_ALL_SUBCATEGORY'] + '/' + subcategoryId;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
}
