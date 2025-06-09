import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DellerFormComponent } from './deller-form.component';

describe('DellerFormComponent', () => {
  let component: DellerFormComponent;
  let fixture: ComponentFixture<DellerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DellerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DellerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
