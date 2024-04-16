import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavUserComponent } from './sidenav-user.component';
import { TestingModule } from '@core/shared/tests.module';
import { AuthService } from '@auth/services/auth.service';

describe('SidenavUserComponent', () => {
  let component: SidenavUserComponent;
  let fixture: ComponentFixture<SidenavUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavUserComponent, TestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
