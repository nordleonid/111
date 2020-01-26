import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Role } from '../../../model/Role';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {NgModule, ViewChild} from '@angular/core';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})

export class RoleCreateComponent implements OnInit {
  submitted = false;
  roleForm: FormGroup;
  Role:any = [];



  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.roleForm.controls;
  }

  onSubmit() {
    console.log(this.roleForm.value);
    this.submitted = true;
    if (!this.roleForm.valid) {
      return false;
    } else {
      this.apiService.createRole(this.roleForm.value).subscribe(
        (res) => {
          console.log('Role successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/roles-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}


