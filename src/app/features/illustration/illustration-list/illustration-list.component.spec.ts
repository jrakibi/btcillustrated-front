import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationListComponent } from './illustration-list.component';

describe('IllustrationListComponent', () => {
  let component: IllustrationListComponent;
  let fixture: ComponentFixture<IllustrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
