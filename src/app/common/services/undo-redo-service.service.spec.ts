import { TestBed, inject } from '@angular/core/testing';

import { UndoRedoServiceService } from './undo-redo-service.service';

describe('UndoRedoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UndoRedoServiceService]
    });
  });

  it('should be created', inject([UndoRedoServiceService], (service: UndoRedoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
