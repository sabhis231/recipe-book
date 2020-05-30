import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCountComponent } from './master-count.component';

describe('MasterCountComponent', () => {
  let component: MasterCountComponent;
  let fixture: ComponentFixture<MasterCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
