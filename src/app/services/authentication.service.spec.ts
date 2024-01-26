import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AuthenticationService } from './authentication.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../../environments/environment';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFireMessagingModule
    ]
  }));

  it('AuthenticationService should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });
});
