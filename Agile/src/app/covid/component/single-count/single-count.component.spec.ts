import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCountComponent } from './single-count.component';

describe('SingleCountComponent', () => {
  let component: SingleCountComponent;
  let fixture: ComponentFixture<SingleCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
