import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-seller',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nav-bar-seller.component.html',
  styleUrl: './nav-bar-seller.component.css'
})
export class NavBarSellerComponent {
isMenuOpen = false;

}
