import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "../../constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    private readonly excludedPaths = [Constants.REGISTER_USER, Constants.SIGN_IN_USER];
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        const isExcluded = this.excludedPaths.some(path => req.url.endsWith(path));

        if (token && !isExcluded) {
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next.handle(authReq);
        }
    
        return next.handle(req);
    }
}