import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Se abbiamo un token, lo aggiungiamo all'header Authorization
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('JWT Interceptor: Token aggiunto alla richiesta');
  } else {
    console.warn('JWT Interceptor: Nessun token trovato in localStorage');
  }

  return next(req);
};
