import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { OrderService } from './order.service';

describe('OrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('OrderService should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
