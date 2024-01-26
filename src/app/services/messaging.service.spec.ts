import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MessagingService } from './messaging.service';

import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../../environments/environment';

describe('MessagingService', () => {
  // let service: MessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFireMessagingModule
  ]});
  });

  it('MessagingService should be created', () => {
    const service: MessagingService = TestBed.get(MessagingService);
    expect(service).toBeTruthy();
  });
});
