import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickComponent } from './tick.component';

describe('TickComponent', () => {
  let component: TickComponent;
  let fixture: ComponentFixture<TickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
