import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = localStorage.getItem('token');
  console.log('🔐 Auth Interceptor:', {
    url: req.url,
    method: req.method,
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 15)}...` : 'No token'
  });

  if (token) {
    console.log('✅ إضافة Token للطلب:', req.url);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authRequest);
  } else {
    console.warn('⚠️ لا يوجد token - الطلب بدون مصادقة:', req.url);
    return next(req);
  }
};
