import { UserInterface } from '../interfaces/user.interface';
import { UserDataService } from './user-data.service';
import { Injectable } from '@angular/core';
import * as aws4 from 'aws4'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { allURLS } from './allURL';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class APIWrapperService {
    user: UserInterface;
    security: {
        accessKeyId: string,
        secretAccessKey: string,
        sessionToken: string
    };
    // service = 'execute-api';
    // region = 'ap-south-1';

    httpHeaders;
    service = 'execute-api';
    region = 'us-west-2';

    constructor(private http: HttpClient, private router: Router, private userDataService: UserDataService) {
    }

    getUserTokens = () => {
        this.user = this.userDataService.getUserData();
        if (this.user) {
            //  .set('Content-Type', 'application/json')
            this.httpHeaders = new HttpHeaders()
                .set('Authorization', 'Bearer ' + this.user['token'])
                .set('Accept', 'application/json');
        }
        else {
            // this.user.next(null);
            this.userDataService.removeUserData();
            this.router.navigate(['/login']);
        }
        // this.security = {
        //     accessKeyId: this.user._accessKey,
        //     secretAccessKey: this.user._secretAccessKey,
        //     sessionToken: this.user._sessionToken
        // };
    }

    callGetAPI = (host, path) => {

        this.getUserTokens();
        // var opts = {
        //     host: host,
        //     service: this.service,
        //     region: this.region,
        //     method: 'GET',
        //     path: path,
        // }

        // const signature = aws4.sign(opts, this.security);
        // delete signature.headers['Host'];
        // const headers = new HttpHeaders(signature.headers);
        try {
            return this.http.get(
                'https://' + host + path,
                { 'headers': this.httpHeaders }
            )
                .pipe(
                    map((response: any) => {
                        return response
                    })
                    // ,catchError()
                );
        } catch (err) {
            return null;
        }
    }

    callPostAPI = (host, path, body, header?) => {
        this.getUserTokens();
        // var opts = {
        //     host: host,
        //     service: this.service,
        //     region: this.region,
        //     method: 'POST',
        //     path: path,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payLoad)
        // }

        // const signature = aws4.sign(opts, this.security)
        // delete signature.headers['Host'];
        // signature.headers = { ...signature.headers, ...header };
        // console.log(signature.headers);
        // const headers = new HttpHeaders(signature.headers);

        try {
            return this.http.post(
                'https://' + host + path,
                body,
                { 'headers': this.httpHeaders }
            )
                .pipe(
                    map((response: any) => { return response }),
                    catchError(error => {
                        console.log('error:..', error);
                        return throwError(error)
                    })
                );
        } catch (err) {
            return null;
        }

    }
}