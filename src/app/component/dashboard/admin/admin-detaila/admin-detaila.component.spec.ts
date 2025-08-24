import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetailaComponent } from './admin-detaila.component';

describe('AdminDetailaComponent', () => {
  let component: AdminDetailaComponent;
  let fixture: ComponentFixture<AdminDetailaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDetailaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDetailaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
