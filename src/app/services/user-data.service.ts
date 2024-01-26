import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    profileImage=new BehaviorSubject<any>(null);

    getUserData() {
        return JSON.parse(localStorage.getItem('user'));
    }

    setProfileImage(profileImage){
        this.profileImage.next(profileImage);
    }
    getProfileImage(){
        return this.profileImage.asObservable();
    }
    setUserData(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    removeUserData() {
        localStorage.removeItem('user');
    }  
}