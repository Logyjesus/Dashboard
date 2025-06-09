import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor() { }

  getStatistics() {
    return {
      totalSales: 25000, // إجمالي المبيعات
      totalOrders: 1200, // إجمالي الطلبات
      bestSellingProducts: [
        { name: 'هاتف سامسونج', sales: 500 },
        { name: 'لابتوب ديل', sales: 300 },
        { name: 'ساعة ذكية', sales: 150 }
      ],
      recentOrders: [
        { orderId: 101, customer: 'أحمد محمد', amount: 250, status: 'مكتمل' },
        { orderId: 102, customer: 'منى خالد', amount: 500, status: 'قيد التنفيذ' },
        { orderId: 103, customer: 'علي حسن', amount: 750, status: 'ملغي' }
      ]
    };
  }

  /*  constructor(private http: HttpClient) {}

  // استدعاء API لجلب الإحصائيات
  getStatistics(): Observable<any> {
    return this.http.get<any>('https://api.example.com/statistics');
  }*/
}
