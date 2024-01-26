import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DishDataService {

    //order
    orderBadgeData = new Subject<any>();

    profileImage=new BehaviorSubject<any>(null);

    setProfileImage(profileImage){
        this.profileImage.next(profileImage);
    }
    getProfileImage(){
        return this.profileImage.asObservable();
    }

    getorderBadgeData() {
        return this.orderBadgeData.asObservable();
    }
    setorderBadgeData(newOrderData) {
        this.orderBadgeData.next(newOrderData);
    }

    ngOnDestroy() {
        this.orderBadgeData.unsubscribe();
        this.profileImage.unsubscribe();
    }
}