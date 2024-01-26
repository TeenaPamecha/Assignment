import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { PusherService } from './pusher.service';

describe('PusherService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('PusherService should be created', () => {
    const service: PusherService = TestBed.get(PusherService);
    expect(service).toBeTruthy();
  });
});
