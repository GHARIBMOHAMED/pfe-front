import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import {JwtHelperService}from '@auth0/angular-jwt'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;
  jwt_decode = new JwtHelperService();
  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
  }
/**
   *  Confirms if user is client
   */
 get isStudent() {
  return this.currentUser && this.currentUserSubject.value.role === Role.Student;
}

/**
 * User login
 *
 * @param email
 * @param password
 * @returns user
 */
 public firstname: any;
 public role: Role;
 public lastname: any;
 public accessToken: any;
 public refreshToken: any;

 
 login(email: string, password: string) {
   
  return this._http
    .post<any>(`${environment.apiUrl}/login`, { email, password }, {observe: 'response' as 'body'})
    .pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          this.firstname=user.body.firstName;
          this.lastname=user.body.lastName;
          this.accessToken=user.headers.get("Jwt-Access-Token");
          this.refreshToken=user.headers.get("Jwt-Refresh-Token");
          if(user.body.roles[0]["roleName"]==="ROLE_SUPER_ADMIN"){
            this.role=Role.Superadmin;
          }else if(user.body.roles[0]["roleName"]==="ROLE_STUDENT"){
            this.role=Role.Student;
            
          }
          const decodedUser = this.jwt_decode.decodeToken(this.accessToken); // decode token
          const expireDate = decodedUser.exp; // get token expiration dateTime

           user =  {"firstName" :this.firstname,"lastName":this.lastname,"role":this.role,"accessToken":this.accessToken,"refreshToken":this.refreshToken,"exp":expireDate};
          
          // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user)
          // Display welcome toast!
          setTimeout(() => {
            this._toastrService.success(
              'You have successfully logged in as an ' +
              this.role +
                ' user to Vuexy. Now you can start to explore. Enjoy! 🎉',
              '👋 Welcome, ' + this.firstname + '!',
              { toastClass: 'toast ngx-toastr', closeButton: true }
            )
          }, 1500)

          // notify
          this.currentUserSubject.next(user)
          
        }

        return user
        
      })
    )
}

/**
 * User logout
 *
 */
callRefreshToken(refresh):Observable<any>{
  return this._http.post(`${environment.apiUrl}/refreshToken`,{headers: `Bearer ${refresh}`}).pipe();
}
/**
 * User logout
 *
 */
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  // notify
  this.currentUserSubject.next(null);
}
}