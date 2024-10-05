import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTalkComponent } from './delete-talk.component';

describe('DeleteTalkComponent', () => {
  let component: DeleteTalkComponent;
  let fixture: ComponentFixture<DeleteTalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTalkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
