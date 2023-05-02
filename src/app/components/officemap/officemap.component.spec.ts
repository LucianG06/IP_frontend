import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficemapComponent } from './officemap.component';

describe('OfficemapComponent', () => {
  let component: OfficemapComponent;
  let fixture: ComponentFixture<OfficemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficemapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
