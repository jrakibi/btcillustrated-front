import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindMapperComponent } from './mind-mapper.component';

describe('MindMapperComponent', () => {
  let component: MindMapperComponent;
  let fixture: ComponentFixture<MindMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MindMapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MindMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
