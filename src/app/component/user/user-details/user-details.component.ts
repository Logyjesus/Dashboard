import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../module/order';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [ MatListModule,
    MatIconModule,CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
user !: User;

constructor(private userService : UserService,private route:ActivatedRoute){}
ngOnInit() {
  const slug = this.route.snapshot.params['slug'];
  this.userService.getUserBySlug(slug).subscribe(user => this.user = user);
}
}
