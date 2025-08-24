import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../../../../module/admin';
import { AdminService } from '../../../../service/admin.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
  import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-detaila',
  imports: [ CommonModule,
    MatIconModule,],
  templateUrl: './admin-detaila.component.html',
  styleUrl: './admin-detaila.component.css'
})
export class AdminDetailaComponent {
  admin?: Admin;

  constructor(private route: ActivatedRoute, private adminService: AdminService,private location: Location) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.adminService.getBySlug(slug).subscribe(admin => this.admin = admin);
  }



goBack() {
  this.location.back();
}

}
