import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinghistoryincreaseDialogComponent } from './bookinghistoryincrease-dialog.component';

describe('BookinghistoryDialogComponent', () => {
  let component: BookinghistoryincreaseDialogComponent;
  let fixture: ComponentFixture<BookinghistoryincreaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookinghistoryincreaseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookinghistoryincreaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
