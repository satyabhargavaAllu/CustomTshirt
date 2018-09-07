import { TestBed, inject } from '@angular/core/testing';

import { DesignsService } from './designs.service';

describe('DesignsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignsService]
    });
  });

  it('should be created', inject([DesignsService], (service: DesignsService) => {
    expect(service).toBeTruthy();
  }));
});
