import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesRightDialogComponent } from './resources-right-dialog.component';

describe('ResourcesRightDialogComponent', () => {
  let component: ResourcesRightDialogComponent;
  let fixture: ComponentFixture<ResourcesRightDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesRightDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesRightDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
