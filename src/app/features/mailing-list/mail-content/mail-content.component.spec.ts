import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailContentComponent } from './mail-content.component';

describe('MailContentComponent', () => {
  let component: MailContentComponent;
  let fixture: ComponentFixture<MailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
