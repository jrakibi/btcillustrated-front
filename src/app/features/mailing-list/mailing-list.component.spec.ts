import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingListComponent } from './mailing-list.component';

describe('MailingListComponent', () => {
  let component: MailingListComponent;
  let fixture: ComponentFixture<MailingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
