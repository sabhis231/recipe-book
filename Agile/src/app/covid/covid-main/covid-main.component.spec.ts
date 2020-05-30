import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidMainComponent } from './covid-main.component';

describe('CovidMainComponent', () => {
  let component: CovidMainComponent;
  let fixture: ComponentFixture<CovidMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
