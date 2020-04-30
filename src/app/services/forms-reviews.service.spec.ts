import { TestBed } from '@angular/core/testing';

import { FormsReviewsService } from './forms-reviews.service';

describe('FormsReviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsReviewsService = TestBed.get(FormsReviewsService);
    expect(service).toBeTruthy();
  });
});
