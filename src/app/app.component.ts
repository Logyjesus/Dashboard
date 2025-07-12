import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth/auth.service';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , FormsModule ,ReactiveFormsModule,HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard-app';


}
