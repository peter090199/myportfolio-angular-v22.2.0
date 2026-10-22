import { TestBed } from '@angular/core/testing';
import { Chatbootservices } from './chatbootservices';

describe('Chatbootservices', () => {
  let service: Chatbootservices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chatbootservices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
