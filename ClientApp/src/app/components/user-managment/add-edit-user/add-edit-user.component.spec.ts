import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserComponent } from './add-edit-user.component';

describe('AddEditUserComponent', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
