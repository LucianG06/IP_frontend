import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookinghistorydecreaseDialogComponent } from './bookinghistorydecrease-dialog.component';

describe('BookinghistorydecreaseDialogComponent', () => {
  let component: BookinghistorydecreaseDialogComponent;
  let fixture: ComponentFixture<BookinghistorydecreaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookinghistorydecreaseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookinghistorydecreaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
