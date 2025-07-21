import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Constants } from "../../constants";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
  private readonly excludedPaths = [Constants.REGISTER_USER, Constants.SIGN_IN_USER];

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const isExcluded = this.excludedPaths.some(path => req.url.endsWith(path));

    let request = req;
    if (token && !isExcluded) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !isExcluded) {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/auth/sign-in']);
        }
        return throwError(() => error);
      })
    );
  }
}