import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyUpdateDialogComponent } from './daily-update-dialog.component';

describe('DailyUpdateDialogComponent', () => {
  let component: DailyUpdateDialogComponent;
  let fixture: ComponentFixture<DailyUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
