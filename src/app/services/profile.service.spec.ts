import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { ProfileService } from './profile.service';
import { AWSHelperService } from './aws4-helper.service';
import { APIWrapperService } from './api-wrapper.service';


describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('ProfileService should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
