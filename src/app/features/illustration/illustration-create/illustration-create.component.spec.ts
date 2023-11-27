import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationCreateComponent } from './illustration-create.component';

describe('IllustrationCreateComponent', () => {
  let component: IllustrationCreateComponent;
  let fixture: ComponentFixture<IllustrationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
