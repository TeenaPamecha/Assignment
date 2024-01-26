import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    host: string = this.awsHelper.getHost('/category-module');

    private url: string;

    constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService) { }

    getAllDriverDetails(){
        
        var path = allURLS['DRIVER_DETAILS'];
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getOnDemandSaleDetails(type,startDate,endDate){
        var path = allURLS['DETAILS_ONDEMAND_SALE']+'?type=' + type + '&start_date=' + startDate + '&end_date=' + endDate;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getReservationSaleDetails(type,startDate,endDate){
        var path = allURLS['DETAILS_RESERVATION_SALE']+'?type=' + type + '&start_date=' + startDate + '&end_date=' + endDate;
        return this.APIWrapperService.callGetAPI(this.host, path);
    }

    getAllChefDetails() {
        var path = allURLS['CHFE_DETAILS'];
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
}
