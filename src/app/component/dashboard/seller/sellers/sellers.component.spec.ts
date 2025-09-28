import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerssComponent } from './sellers.component';

describe('SellersComponent', () => {
  let component: SellerssComponent;
  let fixture: ComponentFixture<SellerssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
