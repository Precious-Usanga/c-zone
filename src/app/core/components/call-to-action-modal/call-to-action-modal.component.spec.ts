import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionModalComponent } from './call-to-action-modal.component';

describe('CallToActionModalComponent', () => {
  let component: CallToActionModalComponent;
  let fixture: ComponentFixture<CallToActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToActionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallToActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
