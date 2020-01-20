import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Role } from '../../../model/Role';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})

export class RoleCreateComponent implements OnInit {  
  submitted = false;
  roleForm: FormGroup;
  RoleProfile: Role[];
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  // Choose role with select dropdown
  updateProfile(e){
    this.roleForm.get('role').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.roleForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.roleForm.valid) {
      return false;
    } else {
      this.apiService.createRole(this.roleForm.value).subscribe(
        (res) => {
          console.log('Role successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
