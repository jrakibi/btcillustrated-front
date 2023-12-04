import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiEmailDialogComponent } from './ai-email-dialog.component';

describe('AiEmailDialogComponent', () => {
  let component: AiEmailDialogComponent;
  let fixture: ComponentFixture<AiEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiEmailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
