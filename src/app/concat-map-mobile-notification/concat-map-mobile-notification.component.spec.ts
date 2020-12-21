import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcatMapMobileNotificationComponent } from './concat-map-mobile-notification.component';

describe('ConcatMapMobileNotificationComponent', () => {
  let component: ConcatMapMobileNotificationComponent;
  let fixture: ComponentFixture<ConcatMapMobileNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcatMapMobileNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcatMapMobileNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
