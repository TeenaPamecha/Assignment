import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {

    const headers = {
      "message_uuid":"",
      "message_type":"EC",
      "version":"1.0",
      "service_completion_status_code":"",
      "created_by":"user_id",
      "created_timestamp": new Date().toLocaleString('en-GB')
    }
    const authReq = req.clone({ setHeaders : headers });
    
    return next.handle(req);
  }
}