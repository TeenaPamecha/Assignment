import { UserInterface } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { UserDataService } from './user-data.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AWSHelperService } from './aws4-helper.service';
import { allURLS } from './allURL';
import { APIWrapperService } from './api-wrapper.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { serverCodes } from '../server-codes';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<User>(null);

  host: string = this.awsHelper.getHost('/user-module');

  private url: string;

  constructor(private http: HttpClient, private router: Router, private userDataService: UserDataService,
    private awsHelper: AWSHelperService, private APIWrapperService: APIWrapperService,
    private angularFireMessaging: AngularFireMessaging) {

  }

  verifyOTP(login) {
    this.user = new BehaviorSubject<User>(null);
    this.userDataService.removeUserData();

    this.url = "https://" + this.host + allURLS['VERIFY_OTP'];
    try {
      return this.http.post(
        this.url,
        login
      ).pipe(
        map((response: any) => {
          let data: any = response;
          if (data) {
            
            switch (data.message) {
              case serverCodes['LOGIN_SUCCESS']: {
                this.handleAuthentication(response.data);
                break;
              }
              case serverCodes['NOT_VERIFYIED_OTP']: {
                break;
              }
            }
          }
          return response;
        })
      )
    } catch (err) {
      return null;
    }
  }
  sendNotification(body) {
    var httpHeaders=new HttpHeaders()
    .set('Authorization', 'Bearer ' + environment.SERVICE_TOKEN)
    .set('Accept', 'application/json');
    this.url = "https://fcm.googleapis.com/fcm/send";
    try {
      return  this.http.post(
        this.url,
        body,
        { 'headers': httpHeaders }
      ).pipe(
        map((response: any) => {
          let data: any = response;
         console.log('body message:..',body);
          return  response;
        })
      )
    } catch (err) {
      return null;
    }
  }

  login(login) {
    this.user = new BehaviorSubject<User>(null);
    this.userDataService.removeUserData();

    this.url = "https://" + this.host + allURLS['EMAIL_LOGIN'];
    try {
      return this.http.post(
        this.url,
        login
      ).pipe(
        map((response: any) => {
          let data: any = response;
          if (data) {
            
            switch (data.message) {

              case serverCodes['LOGIN_SUCCESS']: {
                this.user = new BehaviorSubject<User>(null);
                this.userDataService.removeUserData();
                this.handleAuthentication(response.data);
                break;
              }
              case serverCodes['Error']: {
                this.user.next(null);
                this.userDataService.removeUserData();
                break;
              }
            }
          }
          return response;
        })
      )
    } catch (err) {
      return null;
    }
  }

  onResetPassword(login){
    this.user = new BehaviorSubject<User>(null);
    this.userDataService.removeUserData();

    this.url = "https://" + this.host + allURLS['FORGOT_PASSWORD'];
    try {
      return this.http.post(
        this.url,
        login
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
    } catch (err) {
      return null;
    }
  }
  onChangePassword(login){
    this.user = new BehaviorSubject<User>(null);
    this.userDataService.removeUserData();

    this.url = "https://" + this.host + allURLS['CHANGE_PASSWORD'];
    try {
      return this.http.post(
        this.url,
        login
      ).pipe(
        map((response: any) => {
          return response;
        })
      )
    } catch (err) {
      return null;
    }
  }

  sendOTP(login) {
    this.url = "https://" + this.host + allURLS['SEND_OTP'];
    try {
      return this.http.post(
        this.url,
        login
      )
        .pipe(
          map((response: any) => { return response })
        )
    } catch (err) {
      return null;
    }
  }

  documentList() {
    return this.APIWrapperService.callGetAPI(this.host, allURLS['DOCUMENTS'])
  }

  documentUpdate(documents: FormData) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['UPLOAD_DOCUMENTS'], documents)
  }

  registerPersonalDetail(register) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['REGISTER_PERSONAL_DETAILS'], register)
  }

  userApprove(userAprrovedForm) {
    return this.APIWrapperService.callPostAPI(this.host, allURLS['USER_APPROVED'], userAprrovedForm)
  }

  autoLogin() {

    if (!this.userDataService.getUserData()) {
      return;
    }
    const userData = this.userDataService.getUserData();
    this.user.next(userData);

    // else{
    //   this.user.next(this.userDataService.getUserData());
    // }
    // const userData: UserInterface = this.userDataService.getUserData();

    // const loadedUser = new User(
    //   userData.sequence_user_id,
    //   userData.country_code,
    //   userData.mobile_no,
    //   userData.status,
    //   userData.token,
    //   userData.chef,
    //   userData.userdocuments
    // );
    // this.userDataService.setUserData(loadedUser);
    // this.user.next(loadedUser);
  }

  logout() {
    let user = this.userDataService.getUserData();
    if (user != null && user != undefined) {
      let httpHeaders = new HttpHeaders()
        .set('Authorization', 'Bearer ' + user['token'])
        .set('Accept', 'application/json');

      this.url = "https://" + this.host + allURLS['LOGOUT'];
      try {
         return  this.http.post(
          this.url,
          [],
          { 'headers': httpHeaders }
        ).pipe(
          map((response: any) => {

            console.log('logout response:..', response);
            this.angularFireMessaging.deleteToken(user['notification_token']);
            this.user = new BehaviorSubject<User>(null);
            this.userDataService.removeUserData();
           
            return response;
          })
        )
      } catch (err) {

        return null;
      }
    }
  }
  
  logout_all(){
    let responseObs = this.logout();
    responseObs.subscribe(
      data => {
        let response: any = data;
        this.router.navigate(['/login']);
      },
      err => {
          this.userDataService.removeUserData();
          this.router.navigate(['/login']);
          console.log('error of logout:', err);
      });
  }

  private handleAuthentication(body) {
    this.user.next(body);
    this.userDataService.setUserData(body);
  }

}
