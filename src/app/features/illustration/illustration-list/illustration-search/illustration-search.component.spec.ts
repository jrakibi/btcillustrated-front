import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationSearchComponent } from './illustration-search.component';

describe('IllustrationSearchComponent', () => {
  let component: IllustrationSearchComponent;
  let fixture: ComponentFixture<IllustrationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllustrationSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
