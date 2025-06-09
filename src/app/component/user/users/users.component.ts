import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../module/order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-users',
  imports: [CommonModule,RouterModule, MatButtonModule,
    MatIconModule,
    MatListModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
 constructor(private userService : UserService){}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  delete(slug: string) {
    this.userService.deleteUser(slug).subscribe(() => {
      this.users = this.users.filter(u => u.slug !== slug);
    });
  }
}
