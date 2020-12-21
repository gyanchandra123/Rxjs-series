import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMapSearchFunctionalityComponent } from './switch-map-search-functionality.component';

describe('SwitchMapSearchFunctionalityComponent', () => {
  let component: SwitchMapSearchFunctionalityComponent;
  let fixture: ComponentFixture<SwitchMapSearchFunctionalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchMapSearchFunctionalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMapSearchFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
