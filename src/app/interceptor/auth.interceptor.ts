import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = localStorage.getItem('token')
  console.log('🔐 Interceptor شغّال، التوكن هو:', token);

  if(token){
  const authrequest =req.clone({
    headers : req.headers.set('Authorization',`Bearer ${token}`)
  })
  return next(authrequest);}
  return next (req);
};
