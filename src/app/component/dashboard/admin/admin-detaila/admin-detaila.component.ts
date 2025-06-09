import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admin } from '../../../../module/admin';
import { AdminService } from '../../../../service/admin.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-detaila',
  imports: [CommonModule, MatCardModule],
  templateUrl: './admin-detaila.component.html',
  styleUrl: './admin-detaila.component.css'
})
export class AdminDetailaComponent {
  admin?: Admin;

  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.adminService.getBySlug(slug).subscribe(admin => this.admin = admin);
  }
}
