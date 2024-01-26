
import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs'
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';
import { allURLS } from './allURL';
import { ToastrService } from "ngx-toastr";
import { v4 as uuid } from 'uuid';
// import { getDatabase } from "firebase/database";

// const database = getDatabase();
@Injectable()
export class MessagingService {

  // messaging = firebase.messaging();

  host: string = this.awsHelper.getHost('/notification');

  currentMessage = new BehaviorSubject<any>(null);

  userData: any = [];

  constructor(private userDataService: UserDataService, private toastr: ToastrService,
    private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService,
    private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase,
    private angularFireMessaging: AngularFireMessaging) {

    this.userData = this.userDataService.getUserData();

    this.angularFireMessaging.messaging.subscribe(_messaging => {
      console.log('_messaging:...', _messaging);
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    },
      error => {
        console.log('angular firbase notification error...' + error);
      });

  }


  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        // this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);

        console.log('userData:..', this.userDataService.getUserData());
        this.userData = this.userDataService.getUserData();
        this.userData.notification_token = token;

        this.userDataService.setUserData(this.userData);
        let responseObs = this.saveToken(token);
        responseObs.subscribe(
          data => {
            console.log('save token sucess:..', data);
          }, err => {
            console.log('save token err:..', err);
          })
      },
      (err) => {
        console.log('Unable to get permission to notify.', err);
      }
    );
  }

  getMessagesList(chatId, page){
    
    var data;
    //  this.db.database.ref(chatId).orderByChild('time_stamp').startAt('time_stamp',page.time_stamp).limitToFirst(2)
    //  .on('value', snapshot => {
    //   // if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //     data.push(snapshot.val());
    //     return data;
    //   // } else {
    //   //   console.log("No data available");
    //   // }
    // });
    // return data;
    return this.db.list(chatId, ref => {
      return ref.orderByChild('time_stamp') //.limitToLast(20);
    }).valueChanges();
  }
  getAllUnreadMessagesCount(chatId) {
    return this.db.list(chatId, ref => {
      return ref.orderByChild('read').equalTo(false)
    }).valueChanges();
  }
  createChat(orderId) {
    return this.db.database.ref(orderId).push();
  }
  updateUnreadMessage(chatId, message) {
    const newMessageKey = this.db.database.ref(chatId).key;
    const updates = {};
    updates[chatId + '/' + newMessageKey] = message;
    // updates['/user-posts/' + uid + '/' + newMessageKey] = message;
    return this.db.database.ref(chatId).update(updates);

  }
  getMessages(chatId) {
    return this.db.list(chatId, ref => {
      return ref.orderByChild('time_stamp') //.limitToLast(1);
    }).valueChanges();
  }
  endConversation(chatID) {
    const agentMeta = {
      name: '',
      new: false
    };
    const userMeta = {
      new: false
    };
    //  this.db.database.ref(`ichef-7221a-default-rtdb/${chatID}/meta-data/agent`).update(agentMeta);
    //  this.db.database.ref(`ichef-7221a-default-rtdb/${chatID}/meta-data/user`).update(userMeta);
  }
  sendMessage(message, chatId) {
    var msguuid = uuid().toUpperCase();

    const messageData = {
      msgUuid: msguuid,
      sender: 3,
      read:false,
      text: message,
      time_stamp: new Date().getTime()
    };
    // const agentMeta = {
    //   name: user.name,
    //   new: true
    // };
    // const userMeta = {
    //   new: false
    // };
    this.db.database.ref(chatId + '/' + msguuid).update(messageData);
    return this.db.list(chatId, ref => {
      return ref.orderByChild('time_stamp')//.limitToLast(20);
    }).valueChanges();

    // this.db.database.ref(`${chatID}/meta-data/agent`).update(agentMeta);
    // this.db.database.ref(`${chatID}/meta-data/user`).update(userMeta);
    // this.db.list(`ichef-7221a-default-rtdb/${chatID}/messages`).push(messageData);
    // this.db.database.ref(`ichef-7221a-default-rtdb/${chatID}/meta-data/agent`).update(agentMeta);
    // this.db.database.ref(`ichef-7221a-default-rtdb/${chatID}/meta-data/user`).update(userMeta);
  }

  saveToken(token) {
    var formData = new FormData();
    formData.append("device_token", token);
    formData.append("device_type", "3");
    return this.APIWrapperService.callPostAPI(this.host, allURLS['NOTIFICATION_DEVICE'], formData);
  }

  showMessage(message) {
    this.toastr.show(
      '<span data-notify="icon" class="tim-icons icon-bell-55"></span>',
      message,
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-primary alert-with-icon",
        positionClass: "toast-top-right"
      }
    );
  }
  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        this.currentMessage.next(payload);
        this.showCustomeNotitfication(payload);
      })
  }

  showCustomeNotitfication(payload: any) {

    let notify_data = payload['notification'];
    // let title=notify_data['title'];
    let title = this.userData.chef.first_name + ' ' + this.userData.chef.last_name;
    let options = {
      body: notify_data['body'],
      icon: this.userData.chef.profile_image != null && this.userData.chef.profile_image != undefined ?
        this.userData.chef.profile_image : './assets/img/favicon.png',
      // badget:'./assets/img/white_logo.png',
      // image:'./assets/img/favicon.png',
    };

    console.log("new message received:...", notify_data);
    let notify: Notification = new Notification(title, options);

    notify.onclick = event => {
      event.preventDefault();
      window.location.href = "https://superadmin.ichefsapp.com"
    }
  }
}