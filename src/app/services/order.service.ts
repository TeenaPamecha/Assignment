import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    PaymentIntent,
  } from '@stripe/stripe-js';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    host: string = this.awsHelper.getHost('/order-module');

    private url: string;
    messages: Subject<any>;
    userData: any = [];

    constructor(private router: Router, private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService,
         private http: HttpClient,) {

    }
    setDelayTime_event(OrderId, time) {
        var formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('time', time);

        var path = allURLS['LISTING_ORDERS'] + '/' + OrderId + '/delay';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    getOrderData(orderId){
        var path = allURLS['LISTING_ORDERS']+'/'+orderId
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    orderCancelled(orderId, formData) {
        // var formData = new FormData();
        // formData.append('_method', 'PUT');
        // formData.append('cancel_reason', status);

        var path = allURLS['ORDER_CANCELLED'] + orderId ;
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }
    getAllOrderList(page,pageSize, status: any, filterValue,sequence_service_id?) {
        var path = allURLS['LISTING_ORDERS']+'?page[number]='+page+'&page[size]='+pageSize;
        if (filterValue == '0' || filterValue == 0 || filterValue == null || filterValue == undefined) {
        }else{
           path+='&search='+encodeURIComponent(filterValue);
        }
        var status_c = status + '';
        if (status_c.indexOf(',') > 0) {
            var status_all = status.split(',');
            path += '&filter[status]=' + status_all ;
            if (sequence_service_id != undefined || sequence_service_id != null) {
                path += '&filter[sequence_service_id]=' + sequence_service_id;
            }
        }
        else {
            path += '&filter[status]=' + status 
            if (sequence_service_id != undefined || sequence_service_id != null) {
                path += '&filter[sequence_service_id]=' + sequence_service_id;
            }
        }
        
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    assignDriver(orderId,formData){
        var path = allURLS['ASSIGN_ORDER']+'/' + orderId + allURLS['ASSIGN_DRIVER']
        return this.APIWrapperService.callPostAPI(this.host, path,formData);
    }
    allDriver(orderId){
        var path = allURLS['LISTING_ORDERS']+'/' + orderId + allURLS['DRIVER_AVAILABLE']
        return this.APIWrapperService.callGetAPI(this.host, path);
    }
    getUnAssignDriverOrder(filterValue,page){
        var path=allURLS['UNASSIGN_ORDER']+"?page[number]="+page;
        if(filterValue.trim()!=0 || filterValue.trim() != null || filterValue.trim() != undefined){
            path+='&search='+filterValue.trim();
        }
       
        return this.APIWrapperService.callGetAPI(this.host,path);
    }
    createPaymentIntent(amount: number): Observable<PaymentIntent> {
       var URL=this.host+allURLS['CREATEPAYMENTINTENT'];
        return this.http.post<PaymentIntent>(
          `${URL}`,
          { amount }
        );
      }
    getUpdateOrder(OrderId, status) {
        var formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('status', status);

        var path = allURLS['LISTING_ORDERS'] + '/' + OrderId + '/status';
        return this.APIWrapperService.callPostAPI(this.host, path, formData);
    }

}