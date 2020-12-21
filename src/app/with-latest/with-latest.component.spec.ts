import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithLatestComponent } from './with-latest.component';

describe('WithLatestComponent', () => {
  let component: WithLatestComponent;
  let fixture: ComponentFixture<WithLatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithLatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithLatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
