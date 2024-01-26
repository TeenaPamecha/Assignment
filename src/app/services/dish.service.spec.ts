import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { DishService } from './dish.service';

describe('DishService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule
    ]
  }));

  it('DishService should be created', () => {
    const service: DishService = TestBed.get(DishService);
    expect(service).toBeTruthy();
  });
});
