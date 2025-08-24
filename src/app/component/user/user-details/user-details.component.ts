import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../module/user';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [ MatListModule,
    MatIconModule,CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
user !: User;

constructor(private userService : UserService,private route:ActivatedRoute,private location: Location){}
ngOnInit() {
  const slug = this.route.snapshot.params['slug'];
  this.userService.getUserBySlug(slug).subscribe(user => this.user = user);
}

goBack(): void {
  this.location.back(); // ✅ لازم () علشان تستدعي الدالة
}

}
