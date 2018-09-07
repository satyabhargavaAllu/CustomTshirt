import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignedTshirtComponent } from './designed-tshirt.component';

describe('DesignedTshirtComponent', () => {
  let component: DesignedTshirtComponent;
  let fixture: ComponentFixture<DesignedTshirtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignedTshirtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignedTshirtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
