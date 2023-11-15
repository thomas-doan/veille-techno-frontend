import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAddComponent } from './state-add.component';

describe('StateAddComponent', () => {
  let component: StateAddComponent;
  let fixture: ComponentFixture<StateAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateAddComponent]
    });
    fixture = TestBed.createComponent(StateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
