import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AWSHelperService {
    private host = {
        host1:'ichef-superadmin.theintellify.net',
        host2:'ichef-superadmin-staging.theintellify.net',
        host3:'api-superadmin.ichefsapp.com'
    }

    private APIGroup = {
        '/category-module':this.host.host3,
        '/user-module':this.host.host3,
        '/chef-module': this.host.host3,
        '/subadmin-module':this.host.host3,
        '/driver-module': this.host.host3,
        '/customer-module': this.host.host3,
        '/dish-module': this.host.host3,
        '/order-module': this.host.host3,
        '/notification': this.host.host3
    }

    constructor() {}

    getHost = (APIGroupName) => {
        return this.APIGroup[APIGroupName];
    }
}