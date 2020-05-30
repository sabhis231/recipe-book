import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSearchResultComponent } from './master-search-result.component';

describe('MasterSearchResultComponent', () => {
  let component: MasterSearchResultComponent;
  let fixture: ComponentFixture<MasterSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
