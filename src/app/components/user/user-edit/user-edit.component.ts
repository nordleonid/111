import { User } from '../../../model/User';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Role } from '../../../model/Role';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {NgModule, ViewChild} from '@angular/core';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  Role:any = [];
  User:any = [];
  selectedRole: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.getCreate();
  };

  getCreate(){
    this.apiService.getRoles().subscribe((data) => {
      this.Role = data;
      console.log("get create data", this.Role);
    })    
  }

  ngOnInit() {
    this.updateUser();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getUser(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      role: [this.selectedRole]
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getUser(id) {
    console.log("get user", id)
    this.apiService.getUser(id).subscribe(data => {
      this.User = data;
      console.log("get user data", this.User)
    });
  }

  updateUser() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      role: [this.selectedRole]
    })
  }

  onSubmit(id) {
    console.log("id on submit", id);
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      this.apiService.updateUser(id, this.editForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }
}