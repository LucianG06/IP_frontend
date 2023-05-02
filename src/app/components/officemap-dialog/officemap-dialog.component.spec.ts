import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficemapDialogComponent } from './officemap-dialog.component';

describe('OfficemapDialogComponent', () => {
  let component: OfficemapDialogComponent;
  let fixture: ComponentFixture<OfficemapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficemapDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficemapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
