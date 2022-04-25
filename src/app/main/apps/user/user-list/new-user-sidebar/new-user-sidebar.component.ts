import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserListService } from '../user-list.service';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrComponent } from 'app/main/extensions/toastr/custom-toastr/custom-toastr.component';
import { cloneDeep } from 'lodash';
@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NewUserSidebarComponent implements OnInit {
  [x: string]: any;
  public firstname;
  public lastname;
  public email;
  public role;


  selectChangeHandler (event: any) {
    //update the ui
    this.role = event.target.value;
  }

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {UserListService} _userListService
   */
  constructor(private _toastrService: ToastrService, private _userListService: UserListService,private _httpClient: HttpClient,private _coreSidebarService: CoreSidebarService) {}

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

 
  /**
   * Submit
   *
   * @param newUserformForm
   */
  submit(form) {
    if (form.valid) {
      this._httpClient.post(`${environment.apiUrl}/user/newUser`,{
        "firstName":form.value.firstName,
        "lastName":form.value.lastName,
        "email":form.value.email
           }).subscribe(
    (response) => this._httpClient.post(`${environment.apiUrl}/SuperAdmin/addRoleToAppUser`, {
      "email":form.value.email,
      "roleName":this.role
    }).subscribe(
      ()=>{
        this._userListService.getDataTableRows();
        const customToastrRef = cloneDeep(this.options);
        customToastrRef.toastComponent = CustomToastrComponent;
        customToastrRef.closeButton = true;
        customToastrRef.tapToDismiss = false;
        customToastrRef.progressBar = true;
        customToastrRef.toastClass = 'toast ngx-toastr';
        this._toastrService.success('Have fun storming the castle!', 'Success!', customToastrRef);
        }
    )
  )
  this._userListService.getDataTableRows();
      this.toggleSidebar('new-user-sidebar');
    }
  }

  ngOnInit(): void {}
}
