import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthenticationService } from 'app/auth/service';
import { switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Role, User } from '../models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  jwt_decode = new JwtHelperService();
  refreshToken: any;
  accessToken: any;

  private currentUserSubject: BehaviorSubject<User>;
  /**
   *
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _authenticationService: AuthenticationService) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.indexOf("refreshToken")> -1){
      return next.handle(request);
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = currentUser && currentUser.accessToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      if(Date.now()< Number(currentUser.exp)* 1000){
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.accessToken}`
            }  
          }); 
          return next.handle(request);
      }
      const refreshing = {refresh_token:currentUser.refresh_token}
      return this._authenticationService.callRefreshToken(refreshing).pipe(
        switchMap((newRefreshing:any)=>{
                     
            this.accessToken=newRefreshing.access_token;
            this.refreshToken=newRefreshing.refresh_token;
            const decodedUser = this.jwt_decode.decodeToken(this.accessToken); // decode token
            const expireDate = decodedUser.exp; // get token expiration dateTime
            const user =  {"firstName" :currentUser.firstname,"lastName":currentUser.lastname,"role":currentUser.role,"accessToken":this.accessToken,"refreshToken":this.refreshToken,"exp":expireDate};
            // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(newRefreshing);
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${currentUser.accessToken}`
                  }  
                }); 
                return next.handle(request);

        })
      )
      
    }

    return next.handle(request);
  }
}
