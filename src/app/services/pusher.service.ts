import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { UserDataService } from './user-data.service';
import Pusher from 'pusher-js';

// var pusher = new Pusher("d51b8aabae567c561070", {
//   cluster: "ap2",
// });

// var pusher_driver = new Pusher("d51b8aabae567c561070", {
//   cluster: "ap2",
//   authEndpoint: "https://ichef-node-dev.theintellify.net/pusher/auth",
// });

var pusher = new Pusher("15d7a6cf003213f465a7", {
  cluster: "us2"
});

var pusher_driver = new Pusher("15d7a6cf003213f465a7", {
  cluster: "us2",
  authEndpoint: 'https://api-pusher-auth.ichefsapp.com/pusher/auth'
});

@Injectable()
export class PusherService {

  orderUpdatedStatus;
  userData: any = [];
  channel;
  channel_driver;
// private userDataService: UserDataService
  constructor() {
    // this.orderUpdatedStatus = new BehaviorSubject<any>(null);
    // this.userData = this.userDataService.getUserData();
    // if (this.userData != null && this.userData != undefined) {
    //   var chefId = this.userData.chef.sequence_chef_id.toString();
    //   this.channel = pusher.subscribe("chef." + chefId + ".order");
    // }
  }

  createChannel(orderId){
    var data=[];
    
    this.channel_driver = pusher_driver.subscribe("private-driver." + orderId + ".location").
    bind('client-driver.location',function (data) {
      // this.dishDataService.setDriverLocation(data);
    });
    // this.channel_driver.trigger('client-driver.location',{message:'hello world'});
  }

  ngOnDestroy() {
    this.orderUpdatedStatus.unsubscribe();
  }

}
